<?php

namespace Database\Seeders\BI;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run()
    : void
    {
        $json = file_get_contents(database_path('json_seeders/orders.json'));
        $data = json_decode($json, true);

        if (isset($data['Hoja1'])) {
            foreach ($data['Hoja1'] as $order) {
                // Convert the date format
                $order['created_at'] = Carbon::createFromFormat('m/d/Y', $order['created_at'])->format('Y-m-d');
                DB::table('orders')->insert($order);
            }
        }
    }
}
