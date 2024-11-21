<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class DepartmentData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $created_at,
        public string $updated_at
    ) {}
}
