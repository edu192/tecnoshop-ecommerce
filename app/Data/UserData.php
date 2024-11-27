<?php

namespace App\Data;

use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public int              $id,
        public string           $name,
        public string           $email,
        public ?Carbon $created_at,
        public ?Carbon $updated_at,
        public string           $type,
    )
    {
    }

    public static function fromModel(User $user)
    : self
    {
        return new self(
            $user->id,
            $user->name,
            $user->email,
            $user->created_at,
            $user->updated_at,
            $user->type,
        );
    }
}
