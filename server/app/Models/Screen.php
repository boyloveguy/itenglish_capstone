<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Screen extends Model
{
    protected $table    = 'screen';
    protected $fillable =   ['screen_id', 
                            'link_name', 
                            'screen_name', 
                            'screen_parent'];
}
