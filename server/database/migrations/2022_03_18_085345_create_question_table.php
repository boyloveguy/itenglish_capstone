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
        Schema::create('question', function (Blueprint $table) {
            $table->increments('ques_id');
            $table->string('ques_name', 300);
            $table->string('ques_desc', 1000);
            $table->decimal('ques_point', $precision = 8, $scale = 2);
            $table->integer('exam_id')->unsigned();
            $table->dateTimeTz('cre_date', $precision = 0);
            $table->integer('cre_user')->unsigned();
            $table->dateTimeTz('upd_date', $precision = 0);
            $table->integer('upd_user')->unsigned();
            $table->foreign('exam_id')->references('exam_id')->on('exam')->onUpdate('cascade');
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
        Schema::dropIfExists('question');
    }
};
