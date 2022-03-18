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
        Schema::create('class_it_type', function (Blueprint $table) {
            $table->integer('class_id')->unsigned();
            $table->integer('it_type_id')->unsigned();
            $table->primary(['class_id', 'it_type_id']);
            $table->foreign('class_id')->references('class_id')->on('classroom')->onUpdate('cascade');
            $table->foreign('it_type_id')->references('it_type_id')->on('it_type')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('class_it_type');
    }
};
