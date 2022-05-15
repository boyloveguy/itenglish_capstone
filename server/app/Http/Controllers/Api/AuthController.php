<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login details'
            ], 401);
        }

        $user = auth()->user();
        $isAdmin = auth()->user()->role()->first()->role_id == 1 ? true : false;
        //create token
        $token = $isAdmin ? 
            $user->createToken('auth_token',['admin'])->plainTextToken :
       $user->createToken('auth_token', [])->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }


    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Tokens Revoked'
        ];
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }

    public function changePassword(Request $request)
    {

        $request->validate([
            'password' => 'required|password',
            'new_password' => 'required',
            'new_confirm_password' => 'same:new_password',
        ]);
        $user = auth()->user();

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 200,
            'message' => 'Change password successfully.'
        ]);
    }
}
