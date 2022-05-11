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
        Schema::create('question_pool', function (Blueprint $table) {
            $table->increments('ques_id');
            $table->string('ques_text', 1000);
            $table->string('ques_image', 1000)->nullable();
            $table->integer('ques_type')->unsigned();
            $table->dateTimeTz('cre_date', $precision = 0)->nullable();
            $table->integer('cre_user')->unsigned()->nullable();
            $table->dateTimeTz('upd_date', $precision = 0)->nullable();
            $table->integer('upd_user')->unsigned()->nullable();
            $table->foreign('ques_type')->references('type_id')->on('exam_type')->onUpdate('cascade');
            $table->foreign('cre_user')->references('id')->on('users')->onUpdate('cascade');
            $table->foreign('upd_user')->references('id')->on('users')->onUpdate('cascade');
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
