<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        //Poblar la tabla de usuarios con un usuario administrador
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
        ]);
        //Poblar la tabla de categorias
        Category::create([
            'name' => 'Smartphones',
            'description' => 'Los mejores smartphones del mundo',
        ]);
        Category::create([
            'name' => 'Laptops',
            'description' => 'Las mejores laptops del mundo',
        ]);
        Category::create([
            'name' => 'Televisores',
            'description' => 'Los mejores televisores del mundo',
        ]);
        Category::create([
            'name' => 'Camaras',
            'description' => 'Los mejores camaras del mundo',
        ]);
    }
}
