<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DiscountGroup extends Model
{
    protected $fillable = [
        'name', 'value', 'start_date', 'end_date', 'max_uses', 'actual_uses',
    ];

    protected function casts()
    : array
    {
        return [
            'start_date' => 'datetime',
            'end_date' => 'datetime',
        ];
    }

    public function discounts()
    : HasMany
    {
        return $this->hasMany(Discount::class, 'discount_group_id');
    }
}
