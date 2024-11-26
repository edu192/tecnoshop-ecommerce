<?php

namespace App\Data;

use App\Models\Discount;
use Spatie\LaravelData\Data;

class DiscountData extends Data
{
    public function __construct(
        public string $id,
        public float  $value,
        public string $start_date,
        public string $end_date,
        public int    $max_uses,
        public int    $actual_uses,
        public ?int   $products_count = null,
    )
    {
    }

    public static function fromModel(Discount $discount)
    : self
    {
        return new self(
            $discount->id,
            $discount->value,
            $discount->start_date,
            $discount->end_date,
            $discount->max_uses,
            $discount->actual_uses,
        );
    }
}
