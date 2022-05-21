<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
	public function rankBoard()
	{
		$data = User::select('user_name')
			->withCount([
				'exam_points as total_exam' => function ($query) {
					$query->select(DB::raw('count(exam_id)'));
				}, 'exam_points as ranking' => function ($query) {
					$query->select(DB::raw('round(sum(point))'));
				}, 'exam_points as total_score' => function ($query) {
					$query->select(DB::raw('round(sum(point))'));
				}
			])
			->orderBy('ranking', 'DESC')
			->orderBy('user_name', 'ASC')
			->selectRaw('@no := @no + 1 no')
			->from(DB::raw('`users`, (SELECT @no := 0) vars'))
			->get();

		return response()->json([
			'data' => $data
		]);
	}

	public function show()
	{

		$user = auth()->user();
		$total_point = $user->exam_points()->sum('point');
		$total_exam = $user->exam_points()->count('exam_id');
		$ranking = $total_exam == 0 ? 0 : ($total_point / $total_exam) * 100;
		$role_id = $user->role()->first()->role_id;
		$role_access = $user->role->role_access;
		

		return response()->json([
			'status' => 200,
			'user' => $user,
			'ranking' => round($ranking),
			'total_exam' => $total_exam,
			'total_point' => $total_point,
			'role' => $role_id,
			'role_access' => $role_access
		]);
	}

	public function update(Request $request)
	{
		$request->validate([
			'user_fname' => 'required',
			'user_lname' => 'required',
			'user_avatar' => 'required',
			'user_avatar.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
		]);

		$user = auth()->user();
		$user->user_fname = $request->user_fname;
		$user->user_lname = $request->user_lname;
		$user->user_birthday = $request->user_birthday;
		if ($request->hasFile('user_avatar')) {
			$file      = $request->file('user_avatar');
			$filename  = $file->getClientOriginalName();
			$picture   = date('His') . '-' . $filename;
			//move image to public/img folder
			$file->move(public_path('img'), $picture);
			$user->user_avatar = $picture;
		}
		$user->update();

		return response()->json([
			'status' => 200,
			'user' => $user
		]);
	}
}
