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
        return Inertia::render('Frontend/Category/Index/Page', ['category' => CategoryData::from($category), 'products' => ProductData::collect($category->products()->get())]);
    }
}
