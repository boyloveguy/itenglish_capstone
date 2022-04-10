<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    public $timestamps  = false;
    protected $table    = 'exam';
    protected $fillable =   ['exam_id', 
                            'exam_name', 
                            'it_type_id', 
                            'exam_desc',
                            'type_id', 
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
