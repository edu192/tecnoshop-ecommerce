<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    : void
    {
        Schema::table('discounts', function (Blueprint $table) {
            $table->dropColumn('code');
            $table->dropColumn('type');
            $table->dropMorphs('discountable');
            $table->dropColumn('value');
            $table->dropColumn('start_date');
            $table->dropColumn('end_date');
            $table->dropColumn('max_uses');
            $table->dropColumn('actual_uses');
        });
        Schema::table('discounts', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\DiscountGroup::class)->nullable();
            $table->foreignIdFor(\App\Models\Product::class)->nullable();
        });
    }

    public function down()
    : void
    {
        Schema::table('discounts', function (Blueprint $table) {
            $table->string('code');
            $table->string('type');
            $table->morphs('discountable');
            $table->float('value');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->integer('max_uses');
            $table->integer('actual_uses');
        });
        Schema::table('discounts', function (Blueprint $table) {
            $table->dropForeign(['discount_group_id']);
            $table->dropColumn('discount_group_id');
            $table->dropForeign(['product_id']);
            $table->dropColumn('product_id');
        });
    }
};
