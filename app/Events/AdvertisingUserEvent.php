<?php

namespace App\Events;

use App\Models\Advertising;
use Illuminate\Foundation\Events\Dispatchable;

class AdvertisingUserEvent
{
    use Dispatchable;

    public function __construct(Advertising $advertising)
    {
        $this->advertising = $advertising;
    }
}
