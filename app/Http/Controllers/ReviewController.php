<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        return Inertia::render('Backend/Review/Index/Page');
    }
}
