<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table    = 'question';
    protected $fillable =   ['ques_id',
                            'exam_id',
                            'ques_point',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
