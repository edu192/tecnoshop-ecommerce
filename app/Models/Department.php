<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    protected $fillable = ['name'];

    public function orders()
    : HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function cities()
    : HasMany
    {
        return $this->hasMany(City::class, 'department_id');
    }
}
