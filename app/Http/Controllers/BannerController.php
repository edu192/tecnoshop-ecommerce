<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class BannerController extends Controller
{
    public function index()
    {
        return Inertia::render('Backend/Banner/Index/Page');
    }
}
