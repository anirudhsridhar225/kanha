<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        // Get featured categories with product counts
        $featuredCategories = Category::where('is_active', true)
            ->withCount(['activeProducts'])
            ->orderBy('sort_order')
            ->take(6)
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'products_count' => $category->active_products_count,
                ];
            });

        // Get featured products
        $featuredProducts = Product::where('is_active', true)
            ->where('is_featured', true)
            ->with('category')
            ->take(8)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'sale_price' => $product->sale_price,
                    'images' => $product->images,
                    'is_on_sale' => $product->is_on_sale,
                    'effective_price' => $product->effective_price,
                ];
            });

        return Inertia::render('landing', [
            'featuredCategories' => $featuredCategories,
            'featuredProducts' => $featuredProducts,
        ]);
    }
}
