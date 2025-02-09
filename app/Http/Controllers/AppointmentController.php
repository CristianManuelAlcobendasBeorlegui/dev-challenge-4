<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\AppointmentConfirmationEmail;
use App\Models\Appointment;
use App\Models\Category;
use App\Models\Course;
use App\Models\Timestamp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Ramsey\Uuid\Uuid;

class AppointmentController extends Controller
{
    public function generalData($dateTimestamp)
    {
        $confirmedAppointments = count(DB::select(
            "
            SELECT status, count(*) AS total_appointments
            FROM appointments
            WHERE datetime(timestamp, 'unixepoch') LIKE '%' || strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || '%'
                AND status = 'confirmed'
            GROUP BY 'status'
            "
        ));
        $pendingAppointments = count(DB::select(
            "
            SELECT status, count(*) AS total_appointments
            FROM appointments
            WHERE datetime(timestamp, 'unixepoch') LIKE '%' || strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || '%'
                AND status = 'pending_email_confirmation'
            GROUP BY 'status'
            "
        ));
        $canceledAppointments = count(DB::select(
            "
            SELECT status, count(*) AS total_appointments
            FROM appointments
            WHERE datetime(timestamp, 'unixepoch') LIKE '%' || strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || '%'
                AND status = 'canceled'
            GROUP BY 'status'
            "
        ));

        return json_encode([
            'status'    => 'ok',
            'data'      => [
                'confirmed_appointments' => $confirmedAppointments ?? 0,
                'pending_appointments' => $pendingAppointments ?? 0,
                'canceled_appointments' => $canceledAppointments ?? 0
            ]
        ]);
    }

    public function appointmentsForDay($dateTimestamp)
    {
        $appointments = DB::select(
            "
            SELECT
            appointments.uuid AS 'id',
            appointments.first_name || ' ' || appointments.last_name AS 'full_name',
            appointments.email as 'email',
            courses.name || ' (' || courses.shift || ')' AS 'course',
            categories.name as 'category',
            appointments.observations as 'observations',
            strftime(
                '%d/%m/%Y',
                datetime(appointments.timestamp + 3600, 'unixepoch')
            ) as 'date',
            strftime(
                '%H:%M',
                datetime(appointments.timestamp + 3600, 'unixepoch')
            ) as 'time'
            FROM
            appointments
            JOIN courses ON (appointments.course_id = courses.id)
            JOIN categories ON (appointments.category_id = categories.id)
            WHERE
            datetime(timestamp, 'unixepoch') LIKE '%' || strftime(
                '%Y-%m-%d',
                datetime($dateTimestamp, 'unixepoch')
            ) || '%'
            AND status = 'confirmed'
            "
        );


        return json_encode([
            'status' => 'ok',
            'dateTimestamp' => $dateTimestamp,
            'data' => $appointments
        ]);
    }

    public function create(Request $request)
    {
        $timestamp = floor(($request->input('time') ?? 0));

        $isTimestampAvailable = count(
            Timestamp::select('timestamp')
                ->where([
                    ['timestamp', '=', $timestamp],
                    ['status', '=', 'available']
                ])->get()
        ) > 0;

        if ($isTimestampAvailable) {
            $appointmentUUID = UUID::uuid4();

            $courseId = DB::select("
                    SELECT id 
                    FROM courses
                    WHERE uuid = '" . $request->input('course') . "'
                ")[0]
                ->id;
            $categoryId = DB::select("
                    SELECT id 
                    FROM categories
                    WHERE uuid = '" . $request->input('category') . "'
                ")[0]
                ->id;

            Appointment::insert([
                'uuid' => $appointmentUUID,
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'course_id' => $courseId,
                'category_id' => $categoryId,
                'observations' => $request->input('observations') ?? null,
                'timestamp' => $timestamp,
                'status' => 'pending_email_confirmation'
            ]);

            DB::update("
                UPDATE timestamps
                SET
                    status = 'locked'
                WHERE
                    timestamp = " . $request->input('time') . "
                    AND status = 'available'
            ");

            $categoryName = DB::select("
                    SELECT name 
                    FROM categories 
                    WHERE uuid = '" . $request->input('category') . "'
                ")[0]
                ->name;
            $formattedDate = DB::select("
                SELECT distinct strftime('%d/%m/%Y %H:%M', datetime(" . $request->input('time') + 3600 . ", 'unixepoch')) as 'date'
                FROM timestamps
            ")[0]->date;

            Mail::to($request->input('email'))
                ->send(new AppointmentConfirmationEmail(
                    'Digital Space',
                    '',
                    $request->root() . '/api/appointments/' . $appointmentUUID . '/confirm',
                    $request->root() . '/api/appointments/' . $appointmentUUID . '/cancel',
                    $formattedDate,
                    $categoryName
                ));

            return redirect(url()->previous() . '?alert=An email was sended, confirm your appointment by clicking the link attached to sended mail');
        }

        return redirect(url()->previous() . '?alert=Selected date and time has assigned an appointment. Please choose another date.');
    }

    public function confirm($appointmentUUID)
    {
        $isAppointmentConfirmed = count(
            DB::select("
            SELECT uuid
            FROM appointments
            WHERE uuid = '$appointmentUUID'
                AND status = 'confirmed'
        ")
        ) > 0;

        if (!$isAppointmentConfirmed) {
            $existsEntry = count(
                DB::select("
                SELECT uuid
                FROM appointments
                WHERE uuid = '$appointmentUUID'
                    AND status = 'pending_email_confirmation'
            ")
            ) > 0;

            if ($existsEntry) {
                DB::update("
                    UPDATE appointments
                    SET 
                        status = 'confirmed'
                    WHERE
                        uuid = '$appointmentUUID'
                ");

                return redirect(env('APP_URL') . '/?alert=Your appointment has been confirmed!');
            }

            return redirect(env('APP_URL') . '/?alert=This appointment does not exist or it\'s canceled');
        } else {
            return redirect(env('APP_URL') . '/?alert=This appointment is already confirmed');
        }
    }

    public function cancel($appointmentUUID)
    {
        $appointment = DB::select("
            SELECT uuid, timestamp
            FROM appointments
            WHERE uuid = '$appointmentUUID'
        ");

        if (count($appointment) > 0) {
            DB::update("
                UPDATE appointments
                SET 
                    status = 'canceled'
                WHERE
                    uuid = '$appointmentUUID'
            ");

            DB::update("
                UPDATE timestamps
                SET 
                    status = 'available'
                WHERE
                    timestamp = '" . $appointment[0]->timestamp . "'
            ");

            return redirect(env('APP_URL') . '/?alert=Your appointment has been canceled!');
        }

        return redirect(env('APP_URL') . '/?alert=This appointment does not exist');
    }

    public function appointmentsForEmail($email) {
        $appointments = DB::select("
            SELECT appointments.uuid as 'uuid', categories.name as 'category', strftime('%d/%m/%Y', datetime(appointments.timestamp, 'unixepoch')) as 'date', strftime('%H:%M', datetime(appointments.timestamp, 'unixepoch')) as 'time', appointments.status 'status' 
            FROM appointments JOIN categories ON (appointments.category_id = categories.id)
            WHERE email = '$email'
        ");

        return json_encode([
            'status' => 'ok',
            'data' => $appointments
        ]);
    }
}
