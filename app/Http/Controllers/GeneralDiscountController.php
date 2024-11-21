<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class GeneralDiscountController extends Controller
{
    public function index()
    {
        return Inertia::render('Backend/Discount/Index/Page');
    }
}
