<?php

namespace App\Providers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\ServiceProvider;

class InertiaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register()
    : void
    {
        RedirectResponse::macro('flash', function ($type, $body) {
            session()->flash('flash', compact('type', 'body'));
            return $this;
        });


    }

    /**
     * Bootstrap services.
     */
    public function boot()
    : void
    {
        //
    }
}
