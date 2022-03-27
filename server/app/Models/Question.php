<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table    = 'question';
    protected $fillable =   ['ques_id', 
                            'ques_name', 
                            'ques_desc', 
                            'ques_point', 
                            'exam_is',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
