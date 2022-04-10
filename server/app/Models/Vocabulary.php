<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    public $timestamps  = false;
    protected $table    = 'vocbulary';
    protected $fillable =   ['voc_id', 
                            'voc_name', 
                            'voc_desc', 
                            'parts_of_speech', 
                            'spelling',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
