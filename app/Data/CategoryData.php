<?php

namespace App\Data;

use App\Models\Category;
use DateTime;
use Spatie\LaravelData\Data;

class CategoryData extends Data
{
    public function __construct(
        public int       $id,
        public string    $name,
        public string    $description,
        public ?string   $image = null,
        public ?DateTime $created_at = null,
        public ?DateTime $updated_at = null,
    )
    {
    }

    public static function fromModel(Category $category): self
    {
        $image = $category->getFirstMediaUrl('main_image') ?: null;
        return new self(
            $category->id,
            $category->name,
            $category->description,
            $image,
            $category->created_at,
            $category->updated_at
        );
    }
}
