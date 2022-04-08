<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamType extends Model
{
    protected $table    = 'exam_type';
    protected $fillable =   ['type_id', 
                            'type_name', 
                            'type_desc'];
}
