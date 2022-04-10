<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassMember extends Model
{
    public $timestamps  = false;
    protected $table    = 'class_member';
    protected $fillable =   ['class_id', 
                            'user_id', 
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
