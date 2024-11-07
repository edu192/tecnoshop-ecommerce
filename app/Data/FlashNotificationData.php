<?php

namespace App\Data;

use App\FlashNotificationType;
use Spatie\LaravelData\Data;

class FlashNotificationData extends Data
{
    public function __construct(
        public FlashNotificationType $type,
        public string                $body,
    )
    {
    }
}
