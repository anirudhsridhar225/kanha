<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class FurnitureSeeder extends Seeder
{
    public function run(): void
    {
        // Create furniture categories like Nilkamal
        $categories = [
            [
                'name' => 'Chairs',
                'slug' => 'chairs',
                'description' => 'Comfortable and stylish chairs for your home and office',
                'sort_order' => 1,
            ],
            [
                'name' => 'Tables',
                'slug' => 'tables',
                'description' => 'Dining tables, coffee tables, and office tables',
                'sort_order' => 2,
            ],
            [
                'name' => 'Storage',
                'slug' => 'storage',
                'description' => 'Wardrobes, cabinets, and storage solutions',
                'sort_order' => 3,
            ],
            [
                'name' => 'Stools',
                'slug' => 'stools',
                'description' => 'Bar stools and kitchen stools',
                'sort_order' => 4,
            ],
            [
                'name' => 'Outdoor',
                'slug' => 'outdoor',
                'description' => 'Garden and outdoor furniture',
                'sort_order' => 5,
            ],
        ];

        foreach ($categories as $categoryData) {
            $category = Category::firstOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );

            // Create sample products for each category
            $this->createProductsForCategory($category);
        }
    }

    private function createProductsForCategory(Category $category): void
    {
        $products = [];

        switch ($category->slug) {
            case 'chairs':
                $products = [
                    [
                        'name' => 'Executive Office Chair',
                        'description' => 'Ergonomic office chair with lumbar support and adjustable height',
                        'short_description' => 'Comfortable office chair for long working hours',
                        'price' => 8999.00,
                        'sale_price' => 7499.00,
                        'sku' => 'CHR-EXE-001',
                        'stock_quantity' => 25,
                        'material' => 'Fabric & Metal',
                        'color' => 'Black',
                        'dimensions' => '60 x 65 x 110 cm',
                        'weight' => 15.5,
                    ],
                    [
                        'name' => 'Plastic Dining Chair',
                        'description' => 'Durable plastic chair perfect for dining and outdoor use',
                        'short_description' => 'Lightweight and stackable dining chair',
                        'price' => 1299.00,
                        'sku' => 'CHR-DIN-002',
                        'stock_quantity' => 50,
                        'material' => 'Plastic',
                        'color' => 'White',
                        'dimensions' => '45 x 50 x 85 cm',
                        'weight' => 2.5,
                    ],
                ];
                break;

            case 'tables':
                $products = [
                    [
                        'name' => 'Round Dining Table',
                        'description' => 'Beautiful round dining table for 4 people',
                        'short_description' => 'Perfect for family dining',
                        'price' => 12999.00,
                        'sku' => 'TBL-DIN-001',
                        'stock_quantity' => 15,
                        'material' => 'Wood',
                        'color' => 'Brown',
                        'dimensions' => '120 x 120 x 75 cm',
                        'weight' => 25.0,
                    ],
                    [
                        'name' => 'Study Table',
                        'description' => 'Compact study table with drawer storage',
                        'short_description' => 'Perfect for students and home office',
                        'price' => 4999.00,
                        'sale_price' => 3999.00,
                        'sku' => 'TBL-STD-002',
                        'stock_quantity' => 30,
                        'material' => 'Engineered Wood',
                        'color' => 'Walnut',
                        'dimensions' => '100 x 60 x 75 cm',
                        'weight' => 18.0,
                    ],
                ];
                break;

            case 'storage':
                $products = [
                    [
                        'name' => '3 Door Wardrobe',
                        'description' => 'Spacious wardrobe with hanging space and shelves',
                        'short_description' => 'Large storage wardrobe for bedroom',
                        'price' => 18999.00,
                        'sku' => 'STO-WAR-001',
                        'stock_quantity' => 8,
                        'material' => 'Engineered Wood',
                        'color' => 'White',
                        'dimensions' => '150 x 55 x 200 cm',
                        'weight' => 45.0,
                    ],
                ];
                break;

            case 'stools':
                $products = [
                    [
                        'name' => 'Bar Stool',
                        'description' => 'Modern bar stool with adjustable height',
                        'short_description' => 'Stylish bar stool for kitchen counter',
                        'price' => 2499.00,
                        'sku' => 'STL-BAR-001',
                        'stock_quantity' => 20,
                        'material' => 'Metal & Plastic',
                        'color' => 'Black',
                        'dimensions' => '40 x 40 x 85 cm',
                        'weight' => 4.5,
                    ],
                ];
                break;

            case 'outdoor':
                $products = [
                    [
                        'name' => 'Garden Chair',
                        'description' => 'Weather-resistant outdoor chair',
                        'short_description' => 'Durable chair for garden and patio',
                        'price' => 1899.00,
                        'sku' => 'OUT-CHR-001',
                        'stock_quantity' => 35,
                        'material' => 'Plastic',
                        'color' => 'Green',
                        'dimensions' => '55 x 60 x 85 cm',
                        'weight' => 3.0,
                    ],
                ];
                break;
        }

        foreach ($products as $productData) {
            $productData['category_id'] = $category->id;
            $productData['slug'] = str($productData['name'])->slug();
            $productData['images'] = ['/placeholder-furniture.jpg'];
            $productData['is_featured'] = rand(0, 1) === 1;
            $productData['is_active'] = true;

            Product::firstOrCreate(
                ['sku' => $productData['sku']],
                $productData
            );
        }
    }
}
