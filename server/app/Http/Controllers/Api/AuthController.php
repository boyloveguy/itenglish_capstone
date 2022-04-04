<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        //User check
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();
            $token = $request->user()->createToken($user->email . '_Token')->plainTextToken;
            return response()->json([
                'token' => $token,
                'user' => $user
            ]);
        }
        return response()->json([
            'errors' => [
                'email' => 'The provided credentials do not match our records.',
            ]
        ], 422);
    }


    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        return response()->json([
            'status'=>200,
            'message'=>"Logged Out Successfully"
        ]);
    }
}
