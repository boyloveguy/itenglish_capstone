<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SignUpController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PasswordResetLinkController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\VocabularyController;

Route::post('login', [AuthController::class, 'store']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::get('user', [UserController::class, 'show']);
});
Route::get('user/{id}', [AuthController::class, 'show']);
Route::get('roles', [RoleController::class, 'roles']);
Route::post('forgot-password', [PasswordResetLinkController::class, 'forgotPassword']);
Route::post('reset-password', [PasswordResetLinkController::class, 'resetPassword']);

Route::put('user/{id}', [UserController::class, 'update']);
Route::post('set_role_access',[RoleController::class, 'setRoleAccess']);
Route::get('ranking', [UserController::class, 'rankBoard']);
Route::get('screen/{id}', [RoleController::class, 'getRole']);
Route::delete('remove', [RoleController::class,'removeRoleAccess']);


Route::post('sign_up', [SignUpController::class, 'sign_up']);
Route::get('get_roles', [SignUpController::class, 'get_roles']);
Route::get('exam', [ExamController::class, 'select_all']);
Route::get('refer_exam/{exam_id}', [ExamController::class, 'refer_exam']);
Route::post('save_exam', [ExamController::class, 'save_exam']);
Route::post('delete_exam', [ExamController::class, 'delete_exam']);
Route::post('save_question', [ExamController::class, 'save_question']);
Route::post('get_question_pool', [ExamController::class, 'get_question_pool']);
Route::post('add_from_question_pool', [ExamController::class, 'add_from_question_pool']);
Route::post('refer_exam_explain', [ExamController::class, 'refer_exam_explain']);
Route::post('refer_do_exam', [ExamController::class, 'refer_do_exam']);
Route::post('refer_question', [ExamController::class, 'refer_question']);
Route::post('save_speaking', [ExamController::class, 'save_speaking']);
Route::post('remove_question', [ExamController::class, 'remove_question']);
Route::post('submit_exam_point', [ExamController::class, 'submit_exam_point']);
// video
Route::post('/get_user_online', [VideoController::class, 'get_user_online']);
// vocabulary
Route::post('/get_vocabulary', [VocabularyController::class, 'get_vocabulary']);
Route::post('/get_info', [VocabularyController::class, 'get_info']);
Route::post('/save_vocabulary', [VocabularyController::class, 'save_vocabulary']);
Route::post('/get_vocabulary_by_word', [VocabularyController::class, 'get_vocabulary_by_word']);
Route::post('/delete_vocabulary', [VocabularyController::class, 'delete_vocabulary']);
