<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    //Poblar la base de datos
    public function run()
    : void
    {
        // Poblar la tabla departamentos
        $this->call(DepartmentSeeder::class);
        $this->call(CitySeeder::class);
        $this->call(UserSeeder::class);
        //Poblar la tabla usuarios con un usuario admin
        User::firstOrCreate([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'type' => 'admin',
        ]);
        //Poblar la tabla productos y categorias con los datos de los archivos JSON
        if (File::exists(database_path('data'))) {
            $json = File::get(database_path('/data/products.json'));
            $products = json_decode($json, true);

            foreach ($products as $productData) {
                $product = Product::create($productData);
                $mainImagePath = database_path('/data/images/main/' . $productData['image']);
                if (File::exists($mainImagePath)) {
                    $product->addMedia($mainImagePath)->toMediaCollection('main_image');
                }
            }

            $json = File::get(database_path('/data/categories.json'));
            $categories = json_decode($json, true);
            foreach ($categories as $categoryData) {
                $categoryDataWithoutImage = Arr::except($categoryData, ['image']);
                $category = Category::create($categoryDataWithoutImage);
                $mainImagePath = database_path('/data/images/main/' . $categoryData['image']);
                if (File::exists($mainImagePath)) {
                    $category->addMedia($mainImagePath)->toMediaCollection('main_image');
                }
            }

            $json = File::get(database_path('/data/brands.json'));
            $brands = json_decode($json, true);
            foreach ($brands as $brandData) {
                $brand = Brand::create($brandData);
            }
        }
        //Poblar la tabla reviews
        $this->call(ReviewSeeder::class);
        $this->call(OrderSeeder::class);
    }
}
