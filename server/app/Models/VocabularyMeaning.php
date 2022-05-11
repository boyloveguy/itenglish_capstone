<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VocabularyMeaning extends Model
{
    public $timestamps  = false;
    protected $table    = 'vocabulary_meaning';
    protected $fillable =   ['id',
                            'voc_id', 
                            'meaning',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
