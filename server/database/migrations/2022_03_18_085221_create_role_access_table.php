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
        Schema::create('role_access', function (Blueprint $table) {
            $table->integer('role_id')->unsigned();
            $table->integer('screen_id')->unsigned();
            $table->primary(['role_id', 'screen_id']);
            $table->foreign('role_id')->references('role_id')->on('role')->onUpdate('cascade');
            $table->foreign('screen_id')->references('screen_id')->on('screen')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('role_access');
    }
};
