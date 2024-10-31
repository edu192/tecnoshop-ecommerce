<?php

namespace App\Http\Controllers\Backend;

use App\Data\UserData;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'type' => 'required|string|in:user,admin',
        ]);
        User::create($request->all());
        return redirect()->route('mantenimiento.users.index');
    }
}
