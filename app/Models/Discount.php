<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Discount extends Model
{
    protected $fillable = [
        'discount_group_id', 'product_id',
    ];

    protected function casts()
    : array
    {
        return [
            'start_date' => 'timestamp',
            'end_date' => 'timestamp',
        ];
    }

    public function products()
    : \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'discount_product', 'discount_id', 'product_id');
    }

    public function discount_group()
    : BelongsTo
    {
        return $this->belongsTo(DiscountGroup::class, 'discount_group_id');
    }
}
