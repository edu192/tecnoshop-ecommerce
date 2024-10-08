<?php

namespace App\Http\Controllers\Frontend;

use App\Data\BrandData;
use App\Data\CategoryData;
use App\Data\ProductData;
use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request ,Category $category)
    {
        $productsQuery = $category->products();
        $productsQuery->when($request->search, function($q) use ($request) {
            return $q->where('name', 'like', '%' . $request->search . '%');
        })->when($request->brand, function($q) use ($request) {
            return $q->where('brand', $request->brand);
        });
        $products = $productsQuery->get();

        return Inertia::render('Frontend/Category/Index/Page', [
            'category' => CategoryData::from($category),
            'products' => ProductData::collect($products),
            'brands'=>BrandData::collect(Brand::all())
        ]);
    }

    public function search(Request $request)
    {
        $query = Product::query();
        $query->when($request->search, function($q) use ($request) {
            return $q->where('name', 'like', '%' . $request->search . '%');
        })->when($request->brand, function($q) use ($request) {
            return $q->where('brand', $request->brand);
        });
        $firstProduct = $query->first();
        if ($firstProduct) {
            $category = $firstProduct->category_id;
            return redirect()->route('category.index', [
                'category' => $category,
                'search' => $request->search ?? null,
                'brand' => $request->brand ?? null
            ]);
        } else {
            return Inertia::render('Frontend/Product/NotFound/Page',['search'=>$request->search]);
        }
    }
}
