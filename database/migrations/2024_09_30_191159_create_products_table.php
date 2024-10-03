<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('brand');
            $table->text('description');
            $table->float('price');
            $table->integer('stock');
            $table->string('image');
            $table->foreignId('category_id');
            $table->timestamps();
        });
    }

    public function down()
    : void
    {
        Schema::dropIfExists('products');
    }
};
