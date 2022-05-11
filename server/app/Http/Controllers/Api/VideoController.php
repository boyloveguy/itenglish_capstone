<?php
 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\UserStatus;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
 
class VideoController extends Controller
{
    function get_user_online(Request $res){
        try {
            $list_user_online = DB::table('user')  
            ->join('user_status','user_status.user_id','=','user.id')       
            ->select('user.id'
            , 'user.user_name'
            , 'user_status.status_id'
            , 'user.user_avatar'
            , 'user_fname'
            , 'user_lname')
            ->where('user_status.status_id', '=', 1)
            ->where('user.id', '!=', $res->input('user_id'))->get();
            return response()->json(array('list_user_online' => $list_user_online), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e->getMessage()), 200);
        }
    }
}