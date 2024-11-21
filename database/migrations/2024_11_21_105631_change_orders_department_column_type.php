<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\Department::class, 'department_id')->nullable()->after('city');
        });
    }

    public function down()
    : void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropColumn('department_id');
        });
    }
};
