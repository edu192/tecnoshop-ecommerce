<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    : array
    {
        return [
            'state' =>'completado',
            'total' => 0,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'address' => $this->faker->address(),
            'city' => $this->faker->city(),
            'city_id'=> 0,
            'department' => '',
            'postal_code' => $this->faker->postcode(),
            'payment_method' => 'credit_card',
            'shipping_cost' => '10',
            'department_id' => 0,

            'user_id' => User::factory(),
        ];
    }
}
