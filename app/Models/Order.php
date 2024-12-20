<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'total',
        'state',
        'address',
        'city',
        'department',
        'postal_code',
        'payment_method',
        'department_id',
        'city_id'
    ];

    public function user()
    : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function order_details()
    : HasMany
    {
        return $this->hasMany(OrderDetails::class);
    }
}
