<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\RegisterationController;
use App\Http\Controllers\Api\Auth\ResetPassController;
use App\Http\Controllers\Api\Auth\SendResetPassword;
use App\Http\Controllers\API\Auth\SocialLoginController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\EmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Authentication Routes //

Route::post('register', [RegisterationController::class, 'register']);

Route::post('login', [LoginController::class, 'login']);

Route::post('logout', [LogoutController::class, 'destroy']);

Route::post('forget-password', [SendResetPassword::class, 'forgetPassword']);

Route::post('reset-password', [ResetPassController::class, 'passwordReset']);


//social auth routes 


Route::get('auth/{provider}/redirect', [SocialLoginController::class, 'redirect']) ;
Route::get('auth/{provider}/callback', [SocialLoginController::class, 'callback']) ;


// Products Route 

Route::apiResource('products', ProductsController::class);


// email job
Route::post('/send-emails', [EmailController::class, 'sendEmails']);
