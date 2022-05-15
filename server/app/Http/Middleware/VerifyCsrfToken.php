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
        'api/user',
        'api/images',
        'api/change-password',
        'api/ranking',
        'api/get_user_online/*',
        'api/sign_up',
        'api/refer_question',
        'api/get_question_pool',
        'api/add_from_question_pool',
        'api/save_question',
        'api/refer_question',
        'api/save_speaking',
        'api/refer_do_exam',
        'api/submit_exam_point',
        'api/save_exam',
        'api/delete_exam',
        'api/remove_question',
        'api/refer_exam_explain',
        'api/exam',
        'api/roles',
        'api/refer_exam/*',
        'api/exam-details/*',
        'api/set_role_access',
        'api/screen/*',
        'api/remove*',
        'api/get_vocabulary',
        'api/get_info',
        'api/save_vocabulary',
        'api/get_vocabulary_by_word',
        'api/delete_vocabulary',
        'api/get_user_online'
    ];
}
