<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category')
            ->where('is_active', true)
            ->when($request->category_id, function ($query, $categoryId) {
                return $query->where('category_id', $categoryId);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->paginate(12);

        $categories = Category::where('is_active', true)->get();

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'search'])
        ]);
    }

    public function show(Product $product)
    {
        $product->load('category');

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->take(4)
            ->get();

        return Inertia::render('products/show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts
        ]);
    }

    public function byCategory(Category $category)
    {
        $products = $category->activeProducts()
            ->with('category')
            ->paginate(12);

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => Category::where('is_active', true)->get(),
            'currentCategory' => $category,
            'filters' => ['category_id' => $category->id]
        ]);
    }
}
