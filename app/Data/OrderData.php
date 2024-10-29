<?php

namespace App\Data;

use App\Models\Order;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class OrderData extends Data
{
    /**
     * @param Collection<int, OrderDetailsData> $details
     */
    public function __construct(
        public int        $id,
        public int        $user_id,
        public string     $state,
        public string     $total,
        public string     $created_at,
        public string     $updated_at,
        public Collection $details,
    )
    {
    }

    public static function fromModel(Order $order)
    : self
    {
        return new self(
            id: $order->id,
            user_id: $order->user_id,
            state: $order->state,
            total: $order->total,
            created_at: $order->created_at,
            updated_at: $order->updated_at,
            details: $order->order_details->map(fn($detail) => OrderDetailsData::from($detail)),
        );
    }
}
