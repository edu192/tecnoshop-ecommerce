<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Frontend/Home',['categories'=>\App\Data\CategoryData::collect(\App\Models\Category::all())]);
    }
}
