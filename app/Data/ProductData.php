<?php

namespace App\Data;

use App\Models\DiscountGroup;
use App\Models\Product;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

class ProductData extends Data
{
    /**
     * @param Collection<int, ReviewData> $reviews
     */
    public function __construct(
        public int           $id,
        public string        $name,
        public string        $brand,
        public string        $description,
        public float         $price,
        public int           $category_id,
        public string        $created_at,
        public string        $updated_at,
        public int           $stock,
        public CategoryData  $category,
        public Collection    $reviews,
        public ?string       $image = null,
        public ?int          $quantity = 0,
        public ?DiscountGroupData $discount,
    )
    {
    }

    public static function fromModel(Product $product)
    : self
    {
        $image = $product->getFirstMediaUrl('main_image') ?: null;
        $discountGroup=DiscountGroup::whereHas('discounts', function ($query) use ($product) {
            $query->where('product_id', $product->id);
        })->first();
        return new self(
            $product->id,
            $product->name,
            $product->brand,
            $product->description,
            $product->price,
            $product->category_id,
            $product->created_at->toDateTimeString(),
            $product->updated_at->toDateTimeString(),
            $product->stock,
            CategoryData::from($product->category),
            $product->reviews->map(fn($review) => ReviewData::from($review)),
            $image,
            0,
            $discountGroup ? DiscountGroupData::from($discountGroup) : null,
        );
    }
}
