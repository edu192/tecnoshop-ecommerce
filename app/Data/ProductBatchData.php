<?php

namespace App\Data;

use App\Models\Product;
use Spatie\LaravelData\Data;

class ProductBatchData extends Data
{
    public function __construct(
        public int     $id,
        public string  $provider,
        public int     $quantity,
        public float   $unit_price,
        public int     $product_id,
        public ?string $voucher = null,
    )
    {
    }

    public static function fromModel(Product $product)
    : self
    {
        $voucher = $product->getFirstMediaUrl('voucher');
        return new self(
            id: 0,
            provider: '',
            quantity: 0,
            unit_price: 0,
            product_id: $product->id,
            voucher: $voucher,
        );
    }
}
