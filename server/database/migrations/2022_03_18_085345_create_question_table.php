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
            $table->integer('ques_id')->unsigned();
            $table->integer('exam_id')->unsigned();
            $table->primary(['exam_id', 'user_id']);
            $table->decimal('ques_point', $precision = 8, $scale = 2);
            $table->dateTimeTz('cre_date', $precision = 0)->nullable();
            $table->integer('cre_user')->unsigned()->nullable();
            $table->dateTimeTz('upd_date', $precision = 0)->nullable();
            $table->integer('upd_user')->unsigned()->nullable();
            $table->foreign('exam_id')->references('exam_id')->on('exam')->onUpdate('cascade');
            $table->foreign('ques_id')->references('ques_id')->on('question_pool')->onUpdate('cascade');
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
