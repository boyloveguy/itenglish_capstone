<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStatus extends Model
{
    protected $table    = 'user_status';
    protected $fillable =   ['user_id', 
                            'status_id',
                            'date_upd_status'];
}
