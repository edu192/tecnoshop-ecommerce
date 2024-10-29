<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $fillable = ['name', 'description', 'price', 'category_id'];

    public function category()
    : BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function registerMediaCollections()
    : void
    {
        $this->addMediaCollection('main_image')->useFallbackPath(public_path('/images/no_image_placeholder.jpg'))->singleFile();
        $this->addMediaCollection('gallery_images')->useFallbackPath(public_path('/images/no_image_placeholder.jpg'));
    }

    public function reviews()
    : HasMany
    {
        return $this->hasMany(Review::class);
    }
}
