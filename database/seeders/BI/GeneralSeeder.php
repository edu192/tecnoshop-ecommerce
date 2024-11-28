<?php

namespace Database\Seeders\BI;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Database\Seeders\CitySeeder;
use Database\Seeders\DepartmentSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;

class GeneralSeeder extends Seeder
{
    public function run()
    : void
    {
        $this->call(DepartmentSeeder::class);
        $this->call(CitySeeder::class);
        $this->call(UserSeeder::class);
        //Poblar la tabla productos y categorias con los datos de los archivos JSON
        if (File::exists(database_path('data'))) {
            $json = File::get(database_path('/data/products.json'));
            $products = json_decode($json, true);

            foreach ($products as $productData) {
                $product = Product::create($productData);
                $mainImagePath = database_path('/data/images/main/' . $productData['image']);
                if (File::exists($mainImagePath)) {
                    $product->addMedia($mainImagePath)->toMediaCollection('main_image');
                } else {
                    \Log::warning("File {$mainImagePath} does not exist.");
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
                } else {
                    \Log::warning("File {$mainImagePath} does not exist.");
                }
            }

            $json = File::get(database_path('/data/brands.json'));
            $brands = json_decode($json, true);
            foreach ($brands as $brandData) {
                $brand = Brand::create($brandData);
            }
        }
        //Poblar la tabla reviews
        $this->call(OrderSeeder::class);
        $this->call(OrderDetailSeeder::class);
        $this->call(ReviewSeeder::class);
    }
}
