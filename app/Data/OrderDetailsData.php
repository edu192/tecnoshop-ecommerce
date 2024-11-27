<?php

namespace App\Data;

use App\Models\OrderDetails;
use App\Models\Product;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Data;

class OrderDetailsData extends Data
{
    #[Computed]
    public string $product_name;

    public function __construct(
        public int              $id,
        public int              $order_id,
        public int              $product_id,
        public int              $quantity,
        public float            $unit_price,
        public ?Carbon $created_at,
        public ?Carbon $updated_at,

    )
    {
        $product = Product::find($product_id);
        $this->product_name = $product->name;
    }

    public static function fromModel(OrderDetails $detail)
    : self
    {
        return new self(
            $detail->id,
            $detail->order_id,
            $detail->product_id,
            $detail->quantity,
            $detail->unit_price,
            $detail->created_at,
            $detail->updated_at,
        );
    }
}
