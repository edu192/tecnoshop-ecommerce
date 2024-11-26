<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::create('discount_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('value');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->integer('max_uses');
            $table->integer('actual_uses');
            $table->timestamps();
        });
    }

    public function down()
    : void
    {
        Schema::dropIfExists('discount_groups');
    }

};
