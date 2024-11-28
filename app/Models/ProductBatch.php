<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProductBatch extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'provider', 'quantity', 'product_id', 'unit_price',
    ];
    public function voucher()
    : \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Media::class, 'model')->where('collection_name', 'voucher');
    }

    public function product()
    : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
    public function registerMediaCollections()
    : void
    {
        $this->addMediaCollection('voucher')->singleFile();
    }
}
