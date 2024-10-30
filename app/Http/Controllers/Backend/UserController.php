<?php

namespace App\Http\Controllers\Backend;

use App\Data\UserData;
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all()->map(function (User $user) {
            return UserData::from($user);
        });
        return Inertia::render('Backend/User/Index/Page', ['users' => $users]);
    }
}
