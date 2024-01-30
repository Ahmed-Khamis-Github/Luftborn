<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgetPassRequest;
use App\Models\User;
use App\Notifications\resetpassnotify;
 
class SendResetPassword extends Controller
{
    public function forgetPassword(ForgetPassRequest $request)
	{
		$input = $request->only('email');

		// Check if the URL contains "company" or "user"
 			$user = User::where('email', $input['email'])->first();
 			 
		if ($user) {
			$user->notify(new resetpassnotify());
			$data['success'] = true;
			return ApiResponse::sendResponse(200, 'Email Sent Successfully', $data);
		} else {
			return ApiResponse::sendResponse(404, 'User not found', []);
		}
	}
}
