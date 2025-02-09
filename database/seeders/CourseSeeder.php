<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            'ESO' => [
                'morning'
            ],
            'BAT' => [
                'morning'
            ],
            'ADFI' => [
                'morning',
                'evening'
            ],
            'GEST' => [
                'morning',
                'evening'
            ],
            'GESTJ' => [
                'morning',
                'evening'
            ],
            'ACOM' => [
                'morning',
                'evening'
            ],
            'MARQ' => [
                'morning',
                'evening'
            ],
            'ASIX' => [
                'morning',
                'evening'
            ],
            'DAW' => [
                'morning',
                'evening'
            ],
            'DAM' => [
                'morning',
                'evening'
            ],
            'SMX' => [
                'morning'
            ],
            'CAI' => [
                'morning',
                'evening'
            ],
            'BUCO' => [
                'morning'
            ],
            'FARM' => [
                'morning',
                'evening'
            ]
        ];

        foreach ($courses as $course => $shifts) {
            foreach ($shifts as $shift) {
                Course::insert([
                    'uuid'  => Uuid::uuid4()->toString(),
                    'name'  => $course,
                    'shift' => $shift
                ]);
            }
        }
    }
}
