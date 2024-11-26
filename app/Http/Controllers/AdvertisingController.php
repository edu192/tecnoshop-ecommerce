<?php

namespace App\Http\Controllers;

use App\Data\AdvertisingData;
use App\Data\UserData;
use App\Events\AdvertisingUserEvent;
use App\FlashNotificationType;
use App\Models\Advertising;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class AdvertisingController extends Controller
{
    public function index()
    {
        $advertisingQuery = QueryBuilder::for(Advertising::class)
            ->allowedFilters(['name'])->withCount('users');
        $advertisings = AdvertisingData::collect($advertisingQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/Advertising/Index/Page', ['paginated_collection' => $advertisings]);
    }

    public function create()
    {
        $userQuery = QueryBuilder::for(User::class)
            ->allowedFilters(['email']);
        $users = UserData::collect($userQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/Advertising/Create/Page', ['paginated_collection' => $users]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'message' => 'required|string',
            'product' => 'required|exists:products,id',
            'image' => 'required|image|max:1048|mimes:jpeg,png,jpg',
            'users' => 'required|array',
            'users.*' => 'exists:users,id',
            'allUsersSelected' => 'required|boolean'
        ]);
        $advertising = Advertising::create([
            'name' => $request->input('name'),
            'message' => $request->input('message'),
            'product_id' => $request->input('product'),
        ]);
        if ($request->input('allUsersSelected')) {
            $advertising->users()->attach(User::all());
        } else {
            $advertising->users()->attach($request->input('users'));
        }
        if ($request->hasFile('image')) {
            $advertising->addMediaFromRequest('image')->toMediaCollection('main_image');
        }
        event(new AdvertisingUserEvent($advertising));
        return redirect()->route('mantenimiento.advertising.index')->flash(FlashNotificationType::Success, 'Publicidad creada correctamente');
    }

    public function delete(Request $request, Advertising $advertising)
    {
        $advertising->delete();
        return redirect()->route('mantenimiento.advertising.index')->flash(FlashNotificationType::Success, 'Publicidad eliminada correctamente');
    }

}
