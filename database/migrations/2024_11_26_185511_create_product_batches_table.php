<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::create('product_batches', function (Blueprint $table) {
            $table->id();
            $table->string('provider');
            $table->string('quantity');
            $table->foreignId('product_id');
            $table->string('unit_price');
            $table->timestamps();
        });
    }

    public function down()
    : void
    {
        Schema::dropIfExists('product_batches');
    }
};
