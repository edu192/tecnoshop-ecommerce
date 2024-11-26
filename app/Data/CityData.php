<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class CityData extends Data
{
    public function __construct(
        public int    $id,
        public string $name,
        public int    $department_id,
    )
    {
    }
}
