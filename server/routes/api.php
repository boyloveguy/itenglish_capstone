<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\ExamController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/sign_up', [SignUpController::class, 'sign_up']);
Route::get('/get_roles', [SignUpController::class, 'get_roles']);
Route::get('/exam', [ExamController::class, 'select_all']);
Route::post('/refer_exam', [ExamController::class, 'refer_exam']);
Route::post('/save_exam', [ExamController::class, 'save_exam']);
Route::post('/delete_exam', [ExamController::class, 'delete_exam']);
Route::post('/save_question', [ExamController::class, 'save_question']);
Route::post('/get_question_pool', [ExamController::class, 'get_question_pool']);
Route::post('/add_from_question_pool', [ExamController::class, 'add_from_question_pool']);
Route::post('/refer_exam_explain', [ExamController::class, 'refer_exam_explain']);
Route::post('/refer_do_exam', [ExamController::class, 'refer_do_exam']);
Route::post('/refer_question', [ExamController::class, 'refer_question']);
Route::post('/save_speaking', [ExamController::class, 'save_speaking']);
Route::post('/remove_question', [ExamController::class, 'remove_question']);