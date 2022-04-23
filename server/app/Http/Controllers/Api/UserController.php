<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show($id)
    {

        $user = User::findOrFail($id);
        return response()->json([
            'status' => 200,
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'password' => ['required', 'confirmed'],
            'avatar' => 'required',
            'avatar.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $user = User::findOrFail($id);
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->birthday = $request->birthday;
        $user->password = Hash::make($request->password);
        $user->name = $request->name;
        if ($request->hasFile('avatar')) {
            $file      = $request->file('avatar');
            $filename  = $file->getClientOriginalName();
            $picture   = date('His') . '-' . $filename;
            //move image to public/img folder
            $file->move(public_path('img'), $picture);
            $user->avatar = $picture;
        }
        $user->update();

        return response()->json([
            'status' => 200,
            'user' => $user->avatar
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', new MatchOldPassword],
            'new_password' => ['required'],
            'new_confirm_password' => ['same:new_password'],
        ]);
        User::find(Auth::user()->id)->update(['password'=> Hash::make($request->new_password)]);
        return response()->json([
            'status' => 200,
            'message' => 'Password change successfully.'
        ]);
    }
}
