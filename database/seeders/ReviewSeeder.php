<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ReviewSeeder extends Seeder
{
    public function run()
    : void
    {
        $faker=Faker::create();
        $products= Product::all();
        $users= User::all();
        $users->each(function ($user) use ($faker, $products) {
            $reviewCount = $faker->numberBetween(1, 10);
            $products->random($reviewCount)->each(function ($product) use ($user) {
                if (!$product->reviews()->where('user_id', $user->id)->exists()) {
                    Review::factory()->create([
                        'user_id' => $user->id,
                        'product_id' => $product->id,
                    ]);
                }
            });
        });
    }
}
