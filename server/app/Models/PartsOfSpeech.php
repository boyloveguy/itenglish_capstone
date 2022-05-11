<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartsOfSpeech extends Model
{
    public $timestamps  = false;
    protected $table    = 'parts_of_speech';
    protected $fillable =   ['pos_id', 
                            'pos_name', 
                            'pos_desc'];
}
