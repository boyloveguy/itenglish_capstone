<?php
 
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\QuestionPool;
use App\Models\Question;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
 
class ExamController extends Controller
{
    function select_all(Request $res){
        try {
            $exams = DB::table('exam')
            ->join('it_type','it_type.it_type_id','=','exam.it_type_id')
            ->join('exam_type','exam_type.type_id','=','exam.type_id') 
            ->join('user','user.user_id','=','exam.cre_user')           
            ->select('exam.exam_id'
            , 'exam.exam_name'
            , 'it_type.type_name as major_name'
            , 'exam_type.type_name as type_exam'
            , 'exam_type.type_name as submit_times'
            , 'user.user_name'
            , 'exam.cre_date'
            )->get();            
            return response()->json(array('exam' => $exams), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e), 200);
        }
    }

    function refer_exam(Request $res){
        try {
            $exam_id = $res->input('exam_id');

            $majors = DB::table('it_type')          
            ->select('it_type.it_type_id as key'
            , 'it_type.type_name as text'
            , 'it_type.it_type_id as value'
            )->get();

            $exam_types = DB::table('exam_type')          
            ->select('exam_type.type_id as key'
            , 'exam_type.type_name as text'
            , 'exam_type.type_id as value'
            )->get();

            $exams = DB::table('exam')           
            ->select('exam.exam_id'
            , 'exam.exam_name'
            , 'exam.it_type_id'
            , 'exam.type_id'
            , 'exam.exam_desc'
            )->where('exam_id','=', $exam_id)->get();

            $question_pool          = QuestionPool::all();  

            $questions = DB::table('question_pool')
            ->join('question','question_pool.ques_id','=','question.ques_id')     
            ->select('question_pool.ques_id'
            , 'question_pool.ques_text'
            , 'question.ques_point'
            , 'question_pool.ques_image'
            , 'question.exam_id'
            )->where('question.exam_id','=', $exam_id)->get(); 

            $question_id_list   = DB::table('question')
            ->select('question.ques_id')
            ->where('exam_id','=', $exam_id)->get();  

            $answers = array();
            foreach($question_id_list as $ques_id){
                $answer = DB::table('answer')
                ->where('ques_id','=', $ques_id->ques_id)->get();
                array_push($answers, $answer);
            }

            return response()->json(array('exam'            => $exams
                                        , 'questions'       => $questions
                                        , 'answers'         => $answers
                                        , 'majors'          => $majors
                                        , 'exam_types'      => $exam_types
                                        , 'question_pool'   => $question_pool
                                    ), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e), 200);
        }
    }
}