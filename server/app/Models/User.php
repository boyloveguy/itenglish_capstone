<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    public function ranking(){
        return $this->hasOne(Ranking::class);
    }

    public function exam_points(){
        return $this->hasMany(ExamPoint::class, 'user_id');
    }

    public function role(){
        return $this->belongsTo(Role::class, 'role_id');
    }

    protected $fillable = [
        'id',
        'user_name',
        'user_fname',
        'user_lname',
        'password',
        'user_birthday',
        'user_avatar',
        'role_id',
        'email'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
        'password'
    ];

    public $timestamps  = false;

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];




    public function sendPasswordResetNotification($token)
    {

        $url = 'http://localhost:3000/password_reset/' . $token;

        $this->notify(new ResetPasswordNotification($url));
    }
}
