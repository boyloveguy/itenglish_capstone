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
        Schema::create('user', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('user_name', 50)->unique();
            $table->string('user_fname', 50);
            $table->string('user_lname', 50);
            $table->string('user_password');
            $table->date('user_birthday')->nullable();
            $table->string('user_avatar')->nullable()->default('avatar_default.jpg');
            $table->integer('role_id')->unsigned();
            $table->string('email', 100);
            $table->foreign('role_id')->references('role_id')->on('role')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
};
