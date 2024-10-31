<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidExpiryDateRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Extract month and year from the expiry date
        [$month, $year] = explode('/', $value);

        // Convert to full year if necessary
        $year = strlen($year) == 2 ? '20' . $year : $year;

        // Create a DateTime object for the expiry date
        $expiryDate = \DateTime::createFromFormat('Y-m', $year . '-' . $month);

        // Get the current date
        $currentDate = new \DateTime();

        // Check if the expiry date is in the future
        if ($expiryDate < $currentDate) {
            $fail('La fecha de expiracion no es valida o ya expiro.');
        }
    }
}
