<?php

namespace App\Http\Controllers\Backend;

use App\Data\OrderData;
use App\Data\ProductData;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get()->map(function (Product $product) {
            return ProductData::from($product);
        });
        return Inertia::render('Backend/Product/Index/Page', ['products' => $products]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'brand'=>'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category'=>'required|exists:categories,id',
            'image' => 'required|image|max:1048|mimes:jpeg,png,jpg',
        ]);
        $product = Product::create([
            'name' => $request->input('name'),
            'brand'=>$request->input('brand'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'category_id'=>$request->input('category'),
            'image' => 'outdated'
        ]);
        if ($request->hasFile('image')) {
            $product->addMediaFromRequest('image')->toMediaCollection('main_image');
        }

        return redirect()->route('mantenimiento.products.index');
    }
}
