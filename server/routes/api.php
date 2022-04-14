<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PasswordResetLinkController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('logout', [AuthController::class, 'signOut']);



Route::get('user/{id}', [AuthController::class, 'show']);
Route::post('forgot-password', [PasswordResetLinkController::class, 'forgotPassword']);
Route::post('reset-password', [PasswordResetLinkController::class, 'resetPassword']);
Route::get('user/{id}', [UserController::class, 'show']);
Route::put('user/{id}', [UserController::class, 'update']);


Route::post('login', [AuthController::class, 'store']);
Route::post('change-password', [UserController::class, 'changePassword']);

Route::post('images', [ProductController::class, 'upload']);
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'signOut']);
});
