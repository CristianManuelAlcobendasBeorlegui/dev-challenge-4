<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Timestamp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TimestampController extends Controller
{
    public function index($dateTimestamp, $shiftId)
    {
        $course = DB::select("
            SELECT uuid, name, shift
            FROM courses
            WHERE uuid = '$shiftId'
        ");

        if (count($course) == 0) return json_encode([
            'status' => 'ok',
            'date_timestamp' => ($dateTimestamp * 1000),
            'data' => []
        ]);

        if (strtolower($course[0]->name) == 'eso') {
            $timestamps = DB::select(
                '
                SELECT timestamp
                FROM timestamps
                WHERE datetime(timestamp, \'unixepoch\') LIKE \'%\' || strftime(\'%Y-%m-%d\', datetime(' . $dateTimestamp . ', \'unixepoch\')) || \'%\'
                    AND status = \'available\'
                '
            );
        } else {
            if (strtolower($course[0]->shift) == 'morning') {
                $timestamps = DB::select(
                    "
                    SELECT timestamp
                    FROM timestamps
                    WHERE datetime(timestamp, 'unixepoch') LIKE '%' || strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || '%'
                        AND status = 'available'
                        AND (
                            datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 15:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 16:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 17:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 18:%'
                        )
                    "
                );
            } else {
                $timestamps = DB::select(
                    "
                    SELECT timestamp
                    FROM timestamps
                    WHERE datetime(timestamp, 'unixepoch') LIKE '%' || strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || '%'
                        AND status = 'available'
                        AND (
                            datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 09:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 10:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 11:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 12:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 13:%'
                            OR datetime(timestamp + 3600, 'unixepoch') LIKE strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || ' 14:%'
                        )
                    "
                );
            }
        }

        return json_encode([
            'status'            => 'ok',
            'date_timestamp'    => ($dateTimestamp * 1000),
            'data'              => $timestamps
        ]);
    }

    public function timestampsForDay($dateTimestamp)
    {
        $timestamps = DB::select(
            "
            SELECT timestamp, status
            FROM timestamps
            WHERE datetime(timestamp, 'unixepoch') LIKE '%' || strftime('%Y-%m-%d', datetime($dateTimestamp, 'unixepoch')) || '%'
            "
        );

        $response = [
            'status'            => 'ok',
            'date_timestamp'    => ($dateTimestamp * 1000),
            'data'              => []
        ];

        foreach ($timestamps as $timestamp) {
            $response['data'][$timestamp->timestamp] = [
                'status' => $timestamp->status
            ];
        }

        return json_encode($response);
    }

    public function updateTimestamps(Request $request)
    {
        $date = $request->input('date');
        $utcTimestamps = $request->input('times') ?? [];

        foreach ($utcTimestamps as $utcTimestamp) {
            $existsTimestamp = count(DB::select("
                SELECT timestamp
                FROM timestamps
                WHERE timestamp = '$utcTimestamp'
            ")) > 0;

            // Check if timestamp does not exists
            if (!$existsTimestamp) {
                // Add the timestamp
                Timestamp::insert([
                    'timestamp' => $utcTimestamp,
                    'status' => 'available'
                ]);
            }
        }

        DB::delete(
            "
            DELETE FROM timestamps 
            WHERE
                strftime('%Y-%m-%d', datetime(timestamp, 'unixepoch')) LIKE '$date%'
                AND timestamp NOT IN (" . implode(', ', $utcTimestamps) . ")
            "
        );

        return redirect(url()->previous());
    }
}
