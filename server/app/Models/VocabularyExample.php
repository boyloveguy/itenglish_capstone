<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VocabularyExample extends Model
{
    public $timestamps  = false;
    protected $table    = 'vocabulary_example';
    protected $fillable =   ['id',
                            'voc_id', 
                            'example',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
