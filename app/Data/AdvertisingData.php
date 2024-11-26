<?php

namespace App\Data;

use App\Models\Advertising;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class AdvertisingData extends Data
{
    /**
     * @param Collection<int, OrderDetailsData> $users
     */
    public function __construct(
        public int         $id,
        public string      $name,
        public string      $message,
        public int         $product_id,
        public string      $created_at,
        public string      $updated_at,
        public ?int        $users_count = null,
        public ?Collection $users = null,
    )
    {
    }

    public static function fromModel(Advertising $model)
    : self
    {
        return new self(
            id: $model->id,
            name: $model->name,
            message: $model->message,
            product_id: $model->product_id,
            created_at: $model->created_at,
            updated_at: $model->updated_at,
            users_count: $model->users()->count(),
        );
    }
}
