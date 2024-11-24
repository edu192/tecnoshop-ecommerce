<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class OrderDetailsFactory extends Factory
{
    protected $model = OrderDetails::class;

    public function definition()
    : array
    {
        return [
            'quantity' => $this->faker->randomNumber(),
            'unit_price' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

            'order_id' => 0,
            'product_id' => 0,
        ];
    }
}
