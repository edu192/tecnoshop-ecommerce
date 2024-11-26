<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class BannerData extends Data
{
    public function __construct(
        public int     $id,
        public string  $name,
        public string  $link,
        public ?string $image,
    )
    {
    }

    public static function fromModel($model)
    : self
    {
        $image = $model->getFirstMediaUrl('image') ?? null;
        return new self(
            id: $model->id,
            name: $model->name,
            link: $model->link,
            image: $image,
        );
    }
}
