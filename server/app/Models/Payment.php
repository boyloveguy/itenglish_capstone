<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table    = 'payment';
    protected $fillable =   ['payment_id', 
                            'payment_name', 
                            'payment_desc',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
