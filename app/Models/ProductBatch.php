<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ProductBatch extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'provider', 'quantity', 'product_id', 'unit_price',
    ];

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
