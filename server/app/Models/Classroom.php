<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    public $timestamps  = false;
    protected $table    = 'classroom';
    protected $fillable =   ['class_id', 
                            'class_name', 
                            'class_desc', 
                            // 'member_member', 
                            'max_join',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
