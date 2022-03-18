<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamPoint extends Model
{
    protected $table    = 'exam_point';
    protected $fillable =   ['exam_id', 
                            'user_id', 
                            'point', 
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
