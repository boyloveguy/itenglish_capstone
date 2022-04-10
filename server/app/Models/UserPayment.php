<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPayment extends Model
{
    public $timestamps  = false;
    protected $table    = 'user_payment';
    protected $fillable =   ['paid_id', 
                            'user_id', 
                            'payment_id', 
                            'payment_status',
                            'cre_date', 
                            'cre_user',
                            'upd_date',
                            'upd_user'];
}
