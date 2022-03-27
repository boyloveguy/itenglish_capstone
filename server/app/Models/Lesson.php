<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $table    = 'lesson';
    protected $fillable =   ['lesson_id', 
                            'lesson_name', 
                            'lesson_desc', 
                            'class_id', 
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
