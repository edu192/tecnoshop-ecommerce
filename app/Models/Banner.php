<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Banner extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = ['name', 'link'];

    public function registerMediaCollections()
    : void
    {
        $this->addMediaCollection('image')->useFallbackPath(public_path('/images/no_image_placeholder.jpg'))->singleFile();
    }
}
