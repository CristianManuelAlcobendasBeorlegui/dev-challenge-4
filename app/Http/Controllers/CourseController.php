<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index() {
        $courses = Course::select('uuid', 'name')
            ->get();

        return json_encode([
            'status' => 'ok',
            'data' => $courses
        ]);
    }

    public function shifts($courseUUID) {
        $courseName = Course::select('name')
            ->where('uuid', '=', $courseUUID)
            ->get()[0]->name ?? '';
        
        $shifts = Course::select('uuid', 'shift')
            ->where('name', '=', $courseName)
            ->get();

        return json_encode([
            'status' => 'ok',
            'data' => $shifts
        ]);
    }
}
