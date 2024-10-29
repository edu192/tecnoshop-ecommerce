<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('department')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('payment_method')->nullable();
            $table->float('shipping_cost')->default(0);
        });
    }

    public function down()
    : void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn('address');
            $table->dropColumn('city');
            $table->dropColumn('department');
            $table->dropColumn('postal_code');
            $table->dropColumn('payment_method');
            $table->dropColumn('shipping_cost');
        });
    }
};
