<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassITType extends Model
{
    protected $table    = 'class_it_type';
    protected $fillable =   ['class_id', 
                            'it_type_id'];
}
