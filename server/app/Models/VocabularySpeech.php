<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VocabularySpeech extends Model
{
    public $timestamps  = false;
    protected $table    = 'vocabulary_speech';
    protected $fillable =   ['voc_id', 
                            'pos_id'];
}
