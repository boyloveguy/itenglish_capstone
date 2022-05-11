<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vocabulary extends Model
{
    public $timestamps  = false;
    protected $table    = 'vocabulary';
    protected $fillable =   ['voc_id', 
                            'voc_name', 
                            'spelling',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
