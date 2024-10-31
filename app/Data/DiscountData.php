<?php

namespace App\Data;

use App\Models\Discount;
use Spatie\LaravelData\Data;

class DiscountData extends Data
{
    public function __construct(
        public string $id,
        public string $code,
        public string $type,
        public float  $value,
        public string $start_date,
        public string $end_date,
        public int    $max_uses,
        public int    $actual_uses,

    )
    {
    }

    public static function fromModel(Discount $discount)
    {
        return new self(
            $discount->id,
            $discount->code,
            $discount->type,
            $discount->value,
            $discount->start_date,
            $discount->end_date,
            $discount->max_uses,
            $discount->actual_uses,
        );
    }
}
