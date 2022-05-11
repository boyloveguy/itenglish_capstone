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
					$query->select(DB::raw('round(sum(point)/count(exam_id)*100)'));
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
		$ranking = ($total_point / $total_exam) * 100;
		

		return response()->json([
			'status' => 200,
			'user' => $user,
			'ranking' => round($ranking),
			'total_exam' => $total_exam,
			'total_point' => $total_point
		]);
	}

	public function update(Request $request, $id)
	{
		$request->validate([
			'user_fname' => 'required',
			'user_lname' => 'required',
			'user_avatar' => 'required',
			'user_avatar.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
		]);
		$user = User::findOrFail($id);
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
