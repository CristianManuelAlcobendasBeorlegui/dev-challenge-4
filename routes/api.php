<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TimestampController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Categories
Route::get('/categories', [CategoryController::class, 'index']);

// Course
Route::get('/courses', [CourseController::class, 'index']);

// Shifts
Route::get('/courses/{courseUUID}/shifts', [CourseController::class, 'shifts']);

// Timestamp
Route::get('/timestamps/{dateTimestamp}/{shiftId}/available', [TimestampController::class, 'index']);

// Consult appointments
Route::get('/appointments/for/email/{emailAddress}', [AppointmentController::class, 'appointmentsForEmail']);

// Admin routes
Route::get('/appointments/general-data/{dateTimestamp}', [AppointmentController::class, 'generalData']);
Route::get('/appointments/for/{dateTimestamp}', [AppointmentController::class, 'appointmentsForDay']);
Route::get('/timestamps/{dateTimestamp}', [TimestampController::class, 'timestampsForDay']);
Route::post('/timestamps/update', [TimestampController::class, 'updateTimestamps']);
Route::post('/appointments/create', [AppointmentController::class, 'create']);
Route::get('/appointments/{appointmentUuid}/confirm', [AppointmentController::class, 'confirm']);
Route::get('/appointments/{appointmentUuid}/cancel', [AppointmentController::class, 'cancel']);
