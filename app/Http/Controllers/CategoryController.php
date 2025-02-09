<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::select('uuid', 'name', 'description')
            ->get();

        return json_encode([
            'status' => 'ok',
            'data' => $categories
        ]);
    }
}
