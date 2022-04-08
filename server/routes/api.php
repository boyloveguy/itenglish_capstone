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