<?php

namespace App\Http\Controllers\Backend;

use App\Data\OrderData;
use App\Data\ProductData;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all()->map(function (Product $product) {
            return ProductData::from($product);
        });
        return Inertia::render('Backend/Product/Index/Page', ['products' => $products]);
    }
}
