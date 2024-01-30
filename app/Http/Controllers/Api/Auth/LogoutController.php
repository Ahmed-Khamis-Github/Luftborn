<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken ;


class LogoutController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }
     

    public function destroy($token=null)
    {
        $user = Auth::guard('sanctum')->user();
        if(null===$token)
        {
            $user->currentAccessToken()->delete() ;
            return ApiResponse::sendResponse(200, 'Logged out successfully');

        }
        $personalAccessToken = PersonalAccessToken::findToken($token);

        if ($user->id == $personalAccessToken->tokenable_id && 
        get_class($user) == $personalAccessToken->tokenable_type) {
            $personalAccessToken->delete();

            return ApiResponse::sendResponse(200, 'Logged out successfully');

        }
    }
}
