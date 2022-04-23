<?php
 
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Role;
use App\Models\UserStatus;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
 
class SignUpController extends Controller
{
    function get_roles(Request $res){
        try {
            $roles = DB::table('role')          
            ->select('role.role_id as key'
            , 'role.role_name as text'
            , 'role.role_id as value'
            )->where('role_id', '!=', 1)->get();
            return response()->json(array('list_roles' => $roles), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e), 200);
        }
    }

    function sign_up(Request $res){
        try {
            $user                       = new Users;
            $user->user_name            = $res->input('username');
            $user->user_fname           = !empty($res->input('f_name')) ? $res->input('f_name') : '';
            $user->user_lname           = !empty($res->input('l_name')) ? $res->input('l_name') : '';
            $user->user_password        = Hash::make($res->input('password'));
            $user->user_birthday        = $res->input('b_day');
            $user->role_id              = $res->input('role');
            $user->email                = $res->input('email');
            $user->save();

            $user_status                    = new UserStatus;
            $user_status->user_id           = $user->id;
            $user_status->status_id         = 1; //default status->online
            $user_status->date_upd_status   = Carbon::now()->toDateTimeString();
            $user_status->save();

            return response()->json(array('user_id' => $user->id, 'user_name' => $user->user_name, 'user_role' => $user->role_id, 'success' => true, 'user_created' => 1, 'message' => 'Sign up successful!'), 200);
        } catch (\Exception $e) {
            return response()->json(array('success' => false, 'user_created' => 0, 'message' => 'Username already exist! Please choose another name.', 'error' => $e), 200);
        }
    }
}