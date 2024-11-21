<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
    return Inertia::render('Backend/Stock/Index/Page');
    }
}
