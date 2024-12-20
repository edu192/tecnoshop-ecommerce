<?php

namespace App\Http\Controllers\Backend;

use App\Data\UserData;
use App\FlashNotificationType;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $usersQuery = QueryBuilder::for(User::class)
            ->allowedFilters(['name']);
        $users = UserData::collect($usersQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/User/Index/Page', ['paginated_collection' => $users]);
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
        return redirect()->route('mantenimiento.users.index')->flash(FlashNotificationType::Success, 'Usuario creado correctamente');
    }

    public function update(User $user, Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string',
            'type' => 'required|string|in:user,admin',
        ]);

//        $data = $request->only(['name', 'email', 'type']);
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->type = $request->input('type');
        if ($request->filled('password')) {
            $user->password = $request->input('password');
        }

        $user->save();

        return redirect()->route('mantenimiento.users.index')->flash(FlashNotificationType::Success, 'Usuario actualizado correctamente');
    }

    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()->route('mantenimiento.users.index')->flash(FlashNotificationType::Success, 'Usuario eliminado correctamente');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }
}
