<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Advertising extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $fillable = [
        'name', 'message', 'product_id',
    ];
    public function product()
    : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'advertising_user', 'advertising_id', 'user_id');
    }
}
