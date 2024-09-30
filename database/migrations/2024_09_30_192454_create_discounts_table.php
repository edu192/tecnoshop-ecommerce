<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('type');
            $table->float('value');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->integer('max_uses');
            $table->integer('actual_uses');
            $table->morphs('discountable');
            $table->timestamps();
        });
    }

    public function down()
    : void
    {
        Schema::dropIfExists('discounts');
    }
};
