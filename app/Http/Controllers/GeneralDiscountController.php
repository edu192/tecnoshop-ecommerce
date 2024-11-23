<?php

namespace App\Http\Controllers;

use App\Data\ProductData;
use App\Models\Product;
use Inertia\Inertia;

class GeneralDiscountController extends Controller
{
    public function index()
    {
        return Inertia::render('Backend/Discount/Index/Page');
    }

    public function create()
    {
        return Inertia::render('Backend/Discount/Create/Page', ['products' => ProductData::collect(Product::all())]);
    }
}
