<?php

namespace App\Data;

use App\Models\User;
use Carbon\Carbon;
use Spatie\LaravelData\Data;

class ReviewData extends Data
{
    public string $user_name;
    public function __construct(
        public int $id,
        public int $user_id,
        public int $product_id,
        public int $stars,
        public bool $status,
        public string $comment,
        public ?Carbon $created_at,
        public ?Carbon $updated_at
    ) {
        $user= User::find($user_id);
        $this->user_name = $user->name;
    }

    public static function fromModel($model)
    : ReviewData
    {
        return new self(
            id: $model->id,
            user_id: $model->user_id,
            product_id: $model->product_id,
            stars: $model->stars,
            status: $model->status,
            comment: $model->comment,
            created_at: $model->created_at,
            updated_at: $model->updated_at
        );
    }
}
