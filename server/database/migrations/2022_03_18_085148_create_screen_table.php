<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screen', function ($table) {
            $table->increments('screen_id');
            $table->string('link_name', 50)->unique();
            $table->string('screen_name', 50);
            $table->integer('screen_parent')->unsigned()->nullable();
            $table->foreign('screen_parent')->references('screen_id')->on('screen')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('screen');
    }
};
