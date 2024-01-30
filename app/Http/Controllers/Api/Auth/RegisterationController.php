<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterationRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterationController extends Controller
{
    public function register(RegisterationRequest $request)
    {


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        $data['token'] = $user->createToken('User')->plainTextToken;
        $data['name'] = $user->name;
        $data['email'] = $user->email;

        return ApiResponse::sendResponse(201, 'Account Created Successfully', $data);
    }


}
