<?php

namespace App\Data;

use App\Models\Order;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class OrderData extends Data
{
    /**
     * @param Lazy|Collection<int, OrderDetailsData> $details
     */
    public function __construct(
        public int              $id,
        public int              $user_id,
        public string           $state,
        public string           $total,
        public ?Carbon $created_at,
        public ?Carbon $updated_at,
        public Lazy|Collection       $details,
        public string           $address,
        public string           $city,
        public ?string          $department,
        public string           $postal_code,
        public string           $payment_method,
        public int              $department_id,
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
            address: $order->address,
            city: $order->city ?? 'N/A',
            department: $order->department,
            postal_code: $order->postal_code,
            payment_method: $order->payment_method,
            department_id: $order->department_id
        );
    }
}
