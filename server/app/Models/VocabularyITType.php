<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VocabularyITType extends Model
{
    protected $table    = 'vocbulary_it_type';
    protected $fillable =   ['voc_id', 
                            'it_type_id'];
}
