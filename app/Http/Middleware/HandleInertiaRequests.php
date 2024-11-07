<?php

namespace App\Http\Middleware;

use App\Data\SharedData;
use App\Data\UserData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request)
    : ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request)
    : array
    {
        $state = new SharedData(
            user: Auth::check() ? UserData::from(Auth::user()) : null,
        );
        return [
            ...parent::share($request),
            ...$state->toArray(),
        ];
    }
}
