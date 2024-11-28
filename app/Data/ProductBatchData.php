<?php

namespace App\Data;

use App\Models\ProductBatch;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;

class ProductBatchData extends Data
{
    public function __construct(
        public int            $id,
        public string         $provider,
        public int            $quantity,
        public float          $unit_price,
        public int            $product_id,
        public Lazy|MediaData $voucher,
    )
    {
    }

    public static function fromModel(ProductBatch $batch)
    : self
    {
        $voucher = Lazy::when(
            fn() => $batch->hasMedia('voucher'),
            fn() => MediaData::fromModel($batch->getFirstMedia('voucher'))
        );

        return new self(
            id: $batch->id,
            provider: $batch->provider,
            quantity: $batch->quantity,
            unit_price: $batch->unit_price,
            product_id: $batch->product_id,
            voucher: $voucher
        );
    }
}
