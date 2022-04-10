<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionPool extends Model
{
    public $timestamps  = false;
    protected $table    = 'question_pool';
    protected $fillable =   ['ques_id',
                            'ques_text', 
                            'ques_image',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
