<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            'name' => 'John Doe',
            'email' => 'demo@example.com',
            'email_verified_at' => null,
            'password' => '$2y$12$TBW63VY1MaPFIBiyO6ZplOxF5mC84MHbISBR8t6PDkxr4RCxMPJtC',
            'remember_token' => null,
        ]);
    }
}
