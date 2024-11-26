<?php

namespace Database\Seeders\BI;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderDetailSeeder extends Seeder
{
    public function run()
    : void
    {
        $json = file_get_contents(database_path('json_seeders/order_details.json'));
        $data = json_decode($json, true);

        if (isset($data['Hoja1'])) {
            foreach ($data['Hoja1'] as $orderDetail) {
                DB::table('order_details')->insert($orderDetail);
            }
        }
    }
}
