<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailsJob;
use App\Models\User;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function sendEmails(Request $request)
    {
        $users = User::whereIn('id', $request->input('user_ids'))->get();

        foreach ($users as $user) {
            SendEmailsJob::dispatch($user);
        }

        return response()->json(['message' => 'Emails are being sent in the background']);
    }
}
