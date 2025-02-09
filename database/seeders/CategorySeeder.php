<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Email account' => 'Problems related to school\'s email account.',
            'Network and internet' => 'For internet issues or Wifi credentials',
            'Others' => 'Used to classify unspecified categories.',
        ];

        foreach($categories as $category => $description) {
            Category::insert([
                'uuid' => Uuid::uuid4()->toString(),
                'name' => $category,
                'description' => $description
            ]);
        }
    }
}
