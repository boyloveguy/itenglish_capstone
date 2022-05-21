<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassRoom extends Model
{

   
    public $timestamps  = false;
    protected $table    = 'classroom';
    protected $fillable =   [
        'class_id',
        'class_name',
        'class_desc',
        // 'member_member', 
        'max_join',
        'cre_date',
        'cre_user',
        'upd_date',
        'upd_user'
    ];
    public function users(){
        return $this->belongsToMany(User::class, 'class_member', 'user_id', 'class_id');
    }

    public function class_members(){
        return $this->hasMany(ClassMember::class, 'class_id');
    }

   
}
