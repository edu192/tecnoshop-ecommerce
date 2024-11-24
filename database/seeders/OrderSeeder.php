<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    : void
    {
        $departments = Department::all();
        $products = Product::all();
        $faker = Faker::create();
        $users = User::all();

        $users->each(function ($user) use ($faker, $departments, $products) {
            $orderCount = $faker->numberBetween(1, 5);
            Order::factory()->count($orderCount)->create([
                'user_id' => $user->id,
                'department_id' => $departments->random()->id,
            ])->each(function ($order) use ($products, $faker) {
                $productCount = $faker->numberBetween(1, 10);
                $total = 0;
                $products->random($productCount)->each(function ($product) use ($order, $faker, &$total) {
                    $quantity = $faker->numberBetween(1, 5);
                    $unitPrice = $product->price; // Assuming the Product model has a price attribute
                    $order->order_details()->create([
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'unit_price' => $unitPrice,
                    ]);
                    $total += $quantity * $unitPrice;
                });
                $order->update(['total' => $total]);
            });
        });
    }
}
