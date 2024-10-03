<?php

namespace App\Http\Controllers\Frontend;

use App\Data\CategoryData;
use App\Data\ProductData;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Category $category)
    {
        $name = request('name');
        $priceRange = request('price_range');
        $productsQuery = $category->products();
        if ($name) {
            $productsQuery->where('name', 'like', '%' . $name . '%');
        }
        if ($priceRange) {
            [$minPrice, $maxPrice] = explode('-', $priceRange);
            $productsQuery->whereBetween('price', [(float)$minPrice, (float)$maxPrice]);
        }
        $products = $productsQuery->get();

        return Inertia::render('Frontend/Category/Index/Page', [
            'category' => CategoryData::from($category),
            'products' => ProductData::collect($products)
        ]);
    }
}
