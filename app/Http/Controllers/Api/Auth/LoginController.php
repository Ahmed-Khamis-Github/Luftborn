<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {


        $credentials =['email' => $request->email, 'password' => $request->password] ;

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $user->tokens()->delete();
            $data['token'] =  $user->createToken('UserLogin',['User'])->plainTextToken;
            $data['name'] =  $user->name;
            $data['email'] =  $user->email;
            return ApiResponse::sendResponse(200, 'Login Successfully', $data);
        } else {
            return ApiResponse::sendResponse(401, 'Error with your credentials', null);
        }
    }
}
