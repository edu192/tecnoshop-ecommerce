<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::create('stock_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id');
            $table->integer('previous_quantity');
            $table->integer('new_quantity');
            $table->text('reason');
            $table->timestamps();
        });
    }

    public function down()
    : void
    {
        Schema::dropIfExists('stock_histories');
    }
};
