<?php

namespace App\Data;

use App\Models\Product;
use Spatie\LaravelData\Data;

class ProductData extends Data
{
    public function __construct(
        public int          $id,
        public string       $name,
        public string       $description,
        public float        $price,
        public int          $category_id,
        public string       $created_at,
        public string       $updated_at,
        public CategoryData $category,
        public ?string      $image = null,
    )
    {
    }

    public static function fromModel(Product $product): self
    {
        $image = $product->getFirstMediaUrl('main_image') ?: null;

        return new self(
            $product->id,
            $product->name,
            $product->description,
            $product->price,
            $product->category_id, // Ensure this is an int
            $product->created_at->toDateTimeString(),
            $product->updated_at->toDateTimeString(),
            CategoryData::from($product->category),
            $image,
        );
    }
}