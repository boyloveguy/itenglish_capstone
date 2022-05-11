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
 
class VideoController extends Controller
{
    function get_user_online(Request $res){
        try {
            $list_user_online = DB::table('users')  
            ->join('user_status','user_status.user_id','=','users.id')       
            ->select('users.id'
            , 'users.user_name'
            , 'users_status.status_id'
            , 'users.user_avatar'
            , 'user_fname'
            , 'user_lname')
            ->where('user_status.status_id', '=', 1)
            ->where('users.id', '!=', $res->input('user_id'))->get();
            return response()->json(array('list_user_online' => $list_user_online), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e->getMessage()), 200);
        }
    }
}