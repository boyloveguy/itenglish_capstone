<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Users extends Model
{
    protected $table    = 'user';
    protected $fillable =   ['user_id', 
                            'user_name', 
                            'user_fname', 
                            'user_lname', 
                            'user_password',
                            'user_birthday', 
                            'user_avatar',
                            'role_id',
                            'email'];
    protected $hidden   = ['user_password'];
    public $timestamps  = false;
}
