<?php

namespace App\Data;

use App\Models\Product;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Data;

class OrderDetailsData extends Data
{
    #[Computed]
    public string $product_name;
    public function __construct(
        public int $id,
        public int $order_id,
        public int $product_id,
        public int $quantity,
        public float $unit_price,
        public string $created_at,
        public string $updated_at,
    ) {
        $product= Product::find($product_id);
        $this->product_name = $product->name;
    }
}
