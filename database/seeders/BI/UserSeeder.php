<?php

namespace Database\Seeders\BI;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    : void
    {
        $json = file_get_contents(database_path('json_seeders/users.json'));
        $data = json_decode($json, true);

        if (isset($data['Hoja1'])) {
            foreach ($data['Hoja1'] as $user) {
                // Convert the date format
                $user['created_at'] = Carbon::createFromFormat('m/d/Y', $user['created_at'])->format('Y-m-d');
                DB::table('users')->insert($user);
            }
        }
    }
}
