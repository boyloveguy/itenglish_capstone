<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'api/login',
        'api/logout',
        'api/forgot-password',
        'api/reset-password',
        'api/user/*',
        'api/images',
        'api/change-password'
    ];
}
