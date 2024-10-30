<?php

namespace App\Data;

use App\Models\User;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
      public int $id,
        public string $name,
        public string $email,
        public string $created_at,
        public string $updated_at,
        public string $type,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            $user->id,
            $user->name,
            $user->email,
            $user->created_at->toDateTimeString(),
            $user->updated_at->toDateTimeString(),
            $user->type,
        );
    }
}
