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
        Schema::create('vocabulary_speech', function (Blueprint $table) {
            $table->integer('voc_id')->unsigned();
            $table->integer('pos_id')->unsigned();
            $table->primary(['voc_id', 'pos_id']);
            $table->foreign('voc_id')->references('voc_id')->on('vocabulary')->onUpdate('cascade');
            $table->foreign('pos_id')->references('pos_id')->on('parts_of_speech')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vocabulary_speech');
    }
};
