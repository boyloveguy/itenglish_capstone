<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $primaryKey = 'role_id';
    protected $table    = 'role';
    protected $fillable =   [
        'role_id',
        'role_name',
        'role_desc'
    ];

    public $timestamps  = false;

    function role_access()
    {
        return $this->hasMany(RoleAccess::class, 'role_id');
    }

    public function screens()
    {
        return $this->belongsToMany(Screen::class, 'role_access', 'role_id', 'screen_id')->select(['screen.screen_id', 'screen.screen_name']);
    }
}
