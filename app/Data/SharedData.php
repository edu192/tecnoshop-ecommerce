<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class SharedData extends Data
{
    public function __construct(
        public ?UserData              $user = null,
        public ?FlashNotificationData $flash = null,
    )
    {
        $this->shareFlashNotification();
    }

    protected function shareFlashNotification()
    : void
    {
        if (session()->has('flash')) {
            $this->flash = new FlashNotificationData(
                ...session('flash')
            );
        }
    }
}
