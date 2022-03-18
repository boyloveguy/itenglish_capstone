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
        Schema::create('exam', function (Blueprint $table) {
            $table->increments('exam_id');
            $table->string('exam_name', 200);
            $table->integer('it_type_id')->unsigned();
            $table->string('exam_desc', 1000);
            $table->dateTimeTz('cre_date', $precision = 0);
            $table->integer('cre_user')->unsigned();
            $table->dateTimeTz('upd_date', $precision = 0);
            $table->integer('upd_user')->unsigned();
            $table->foreign('it_type_id')->references('it_type_id')->on('it_type')->onUpdate('cascade');
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
        Schema::dropIfExists('exam');
    }
};
