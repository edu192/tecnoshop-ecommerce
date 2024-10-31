<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    protected $fillable = [
        'code',
        'type',
        'value',
        'start_date',
        'end_date',
        'max_uses',
        'actual_uses',
        'discountable_id',
        'discountable_type',
    ];

    protected function casts()
    : array
    {
        return [
            'start_date' => 'timestamp',
            'end_date' => 'timestamp',
        ];
    }
}
