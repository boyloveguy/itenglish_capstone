<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table    = 'answer';
    protected $fillable =   ['ans_id', 
                            'ans_desc', 
                            'is_correct_ans', 
                            'ques_id', 
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
