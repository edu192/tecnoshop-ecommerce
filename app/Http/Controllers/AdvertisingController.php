<?php

namespace App\Http\Controllers;

use App\Data\UserData;
use App\Models\User;
use Inertia\Inertia;

class AdvertisingController extends Controller
{
    public function index()
    {
        return Inertia::render('Backend/Advertising/Index/Page');
    }

    public function create()
    {
        return Inertia::render('Backend/Advertising/Create/Page',['users' => UserData::collect(User::all())]);
    }
}
