<?php

namespace App\Http\Controllers\Frontend;

use App\Data\ProductData;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(Product $product)
    {
        return Inertia::render('Frontend/Product/Show/Page',
            ['product' => ProductData::from($product)]
        );
    }
}
