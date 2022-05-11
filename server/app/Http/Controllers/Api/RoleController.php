<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Screen;
use App\Models\Role;
use App\Models\RoleAccess;

class RoleController extends Controller
{
    function roles()
    {
        $roles = Role::Select('role_id', 'role_name')->get();
        $screens = Screen::all();
        $role =  Role::first();
        $data = $role->screens()->get();

        return response()->json(
            [
                'roles' => $roles,
                'data' => $data,
                'screen' => $screens,
                'role' => $role
            ]
        );
    }

    function getRole($id)
    {
        $role = Role::find($id);
        $data = $role->screens()->get();
        return response()->json(
            [
                'data' => $data,
                'role' => $role
            ]
        );
    }

    function setRoleAccess(Request $request)
    {
        $role = Role::find($request->role_id);

        if ($role == null) {
            $role = new Role;
            $role->role_name = $request->role_name;
            $role->role_desc = $request->role_desc;
            $role->save();
            if (json_decode($request->screen_ids) != []) {
                foreach (json_decode($request->screen_ids) as $screen_id) {
                    $role->screens()->attach($role->role_id, ['role_id' => $role->role_id, 'screen_id' => $screen_id]);
                }
            }
            return response()->json([
                "status" => 200,
                "message" => "Save role screen successfully",
                "role" => $role,
                "roles" => Role::all()
            ]);
        } else {
            $role->role_name = $request->role_name;
            $role->role_desc = $request->role_desc;
            $role->save();

            if (json_decode($request->screen_ids) != []) {
                foreach (json_decode($request->screen_ids) as $screen_id) {
                    $role_access[] =  RoleAccess::updateOrCreate(['role_id' => $request->role_id, 'screen_id' => $screen_id]);
                }
                $role->role_access()->saveMany($role_access);
            }
            return response()->json([
                "status" => 200,
                "message" => "Save role screen successfully",
                "role" => $role,
                "roles" => Role::all()
            ]);
        }
    }

    function removeRoleAccess(Request $request)
    {

        $role_access = RoleAccess::where(['role_id'=> $request->query('role_id'), 'screen_id'=> $request->query('screen_id')])->delete();
        return response()->json(
            [
                "status" => 200,
                "message" => "Delete successfully",
                "data" =>  $role_access
            ]
        );
    }
}
