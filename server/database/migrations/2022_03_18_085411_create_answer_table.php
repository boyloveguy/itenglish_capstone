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
        Schema::create('answer', function (Blueprint $table) {
            $table->increments('ans_id');
            $table->string('ans_desc', 1000);
            $table->integer('is_correct_ans');
            $table->integer('ques_id')->unsigned();
            $table->dateTimeTz('cre_date', $precision = 0)->nullable();
            $table->integer('cre_user')->unsigned()->nullable();
            $table->dateTimeTz('upd_date', $precision = 0)->nullable();
            $table->integer('upd_user')->unsigned()->nullable();
            $table->foreign('ques_id')->references('ques_id')->on('question_pool')->onUpdate('cascade');
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
        Schema::dropIfExists('answer');
    }
};
