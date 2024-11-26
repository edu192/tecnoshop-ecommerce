<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Advertising extends Model
{
    public function product()
    : BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function users()
    : HasMany
    {
        return $this->hasMany(User::class, 'advertising_user','advertising_id');
    }
}
