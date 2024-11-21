<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdvertisingController extends Controller
{
    public function index()
    {
        return Inertia::render('Backend/Advertising/Index/Page');
    }
}
