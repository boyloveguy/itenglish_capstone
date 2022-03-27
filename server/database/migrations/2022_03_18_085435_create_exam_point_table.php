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
        Schema::create('exam_point', function (Blueprint $table) {
            $table->integer('exam_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->primary(['exam_id', 'user_id']);
            $table->decimal('point', $precision = 8, $scale = 2);
            $table->dateTimeTz('cre_date', $precision = 0);
            $table->integer('cre_user')->unsigned();
            $table->dateTimeTz('upd_date', $precision = 0);
            $table->integer('upd_user')->unsigned();
            $table->foreign('exam_id')->references('exam_id')->on('exam')->onUpdate('cascade');
            $table->foreign('user_id')->references('user_id')->on('user')->onUpdate('cascade');
            $table->foreign('cre_user')->references('user_id')->on('user')->onUpdate('cascade');
            $table->foreign('upd_user')->references('user_id')->on('user')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exam_point');
    }
};
