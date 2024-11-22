<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index(Product $product)
    {
    return Inertia::render('Backend/Stock/Index/Page', ['product' => $product]);
    }
}
