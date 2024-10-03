<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class BrandData extends Data
{
    public function __construct(
        public string $name,
    ) {}

    public function fromModel()
    {
        return new self(
            name: $this->name,
        );
    }
}
