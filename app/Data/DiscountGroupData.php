<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class DiscountGroupData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public float  $value,
        public string $start_date,
        public string $end_date,
        public int    $max_uses,
        public int    $actual_uses,
        public string $created_at,
        public string $updated_at,
        public ?int   $discounts_count = null,
    )
    {
    }

    public static function fromModel(\App\Models\DiscountGroup $discountGroup)
    : self
    {
        return new self(
            $discountGroup->id,
            $discountGroup->name,
            $discountGroup->value,
            $discountGroup->start_date,
            $discountGroup->end_date,
            $discountGroup->max_uses,
            $discountGroup->actual_uses,
            $discountGroup->created_at,
            $discountGroup->updated_at,
            $discountGroup->discounts()->count(),
        );
    }
}
