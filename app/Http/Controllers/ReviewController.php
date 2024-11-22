<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index(Product $product)
    {
        return Inertia::render('Backend/Review/Index/Page',['product' => $product]);
    }
}
