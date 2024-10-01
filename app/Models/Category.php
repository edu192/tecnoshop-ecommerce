<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Category extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $fillable = ['name', 'description'];

    public function products()
    : HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function registerMediaCollections()
    : void
    {
        $this->addMediaCollection('main_image')->useFallbackPath(public_path('/images/no_image_placeholder.jpg'))->singleFile();
        $this->addMediaCollection('background_image')->useFallbackPath(public_path('/images/no_image_placeholder.jpg'))->singleFile();
    }
}
