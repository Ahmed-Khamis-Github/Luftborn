<?php

use App\Http\Controllers\API\Auth\SocialLoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('auth/{provider}/redirect', [SocialLoginController::class, 'redirect']) ;
Route::get('auth/{provider}/callback', [SocialLoginController::class, 'callback']) ;
