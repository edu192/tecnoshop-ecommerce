<?php

namespace App\Listeners;

use App\Events\AdvertisingUserEvent;
use App\Notifications\AdvertisingNotification;

class SendAdvertisingToUsersListener
{
    public function __construct()
    {
    }

    public function handle(AdvertisingUserEvent $event)
    : void
    {
        $event->advertising->users->each(function ($user) use ($event) {
            $user->notify(new AdvertisingNotification(
                $event->advertising->name,
                $event->advertising->message,
                route('product.show', $event->advertising->product_id)));
        });
    }
}
