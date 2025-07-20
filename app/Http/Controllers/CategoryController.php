<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->withCount('activeProducts')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('categories/index', [
            'categories' => $categories
        ]);
    }

    public function show(Category $category)
    {
        $products = $category->activeProducts()
            ->with('category')
            ->paginate(12);

        return Inertia::render('categories/show', [
            'category' => $category,
            'products' => $products
        ]);
    }
}
