<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ITType extends Model
{
    protected $table    = 'it_type';
    protected $fillable =   ['it_type_id', 
                            'type_name', 
                            'type_desc'];
}
