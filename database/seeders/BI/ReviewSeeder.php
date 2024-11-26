<?php

namespace Database\Seeders\BI;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ReviewSeeder extends Seeder
{
    public function run()
    : void
    {
        $json = file_get_contents(database_path('json_seeders/reviews.json'));
        $data = json_decode($json, true);

        if (isset($data['Hoja1'])) {
            foreach ($data['Hoja1'] as $review) {
                DB::table('reviews')->insert($review);
            }
        }
    }
}
