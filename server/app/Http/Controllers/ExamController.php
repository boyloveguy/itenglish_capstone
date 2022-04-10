<?php
 
namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\QuestionPool;
use App\Models\Question;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
 
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

    function save_exam(Request $res){
        try {
            $type_save = $res->input('type_save');

            //update
            if($type_save == '1'){
                Exam::where('exam_id', $res->input('exam_id'))
                ->update([
                    'exam_name'     => $res->input('exam_name'),
                    'exam_desc'     => !empty($res->input('exam_desc')) ? $res->input('exam_desc') : '',
                    'it_type_id'    => $res->input('exam_major'),
                    'type_id'       => $res->input('exam_type'),
                    'upd_user'      => $res->input('user_id'),
                    'upd_date'      => Carbon::now()->toDateTimeString()
                ]);
            }
            //insert
            else{

            }
            return response()->json(array('success' => true, 'message' => 'Save successfull!'), 200);
        } catch (\Exception $e) {
            return response()->json(array('success' => false, 'message' => 'An error occurred', 'error' => $e), 200);
        }
    }

    function delete_exam(Request $res){
        try {
            $exam_id = $res->input('type_save');
            Exam::where('exam_id', '=', $exam_id)->delete();
            return response()->json(array('success' => true, 'message' => 'Delete successfull!'), 200);
        } catch (\Exception $e) {
            return response()->json(array('success' => false, 'message' => 'An error occurred', 'error' => $e), 200);
        }
    }

    function save_question(Request $res){
        try {
            // $question       = new Question;
            // $question_pool  = new QuestionPool;            

            // //add to table "question_pool"
            // $question_pool->ques_text   = $res->input('ques_text');
            // $question_pool->ques_image  = $res->input('ques_image');
            // $question_pool->cre_user    = $res->input('user_id');
            // $question_pool->cre_date    = Carbon::now()->toDateTimeString();
            // $question_pool->upd_user    = null;
            // $question_pool->upd_date    = null;
            // $question_pool->save();

            //upload image to folder public/images
            // $file_ary = $this->reArrayFiles($_FILES['ques_image']);
            // $listImages = $file_ary;          
            $def = '';
            for( $i = 0; $i < count($_FILES['ques_image']); $i++){
                $def = $_FILES['ques_image']['tmp_name'];
            }

            // foreach($listImages as $img){
            //     $def = $img;
            // }

            // //add to table "question"
            // $question->ques_id      = $question_pool->id;
            // $question->exam_id      = $res->input('exam_id');
            // $question->ques_point   = $res->input('ques_point');
            // $question->cre_user     = $res->input('user_id');
            // $question->cre_date     = Carbon::now()->toDateTimeString();
            // $question->upd_user     = null;
            // $question->upd_date     = null;
            // $question->save();
            
            // //add to table "answer"
            // $listAns = json_decode($res->input('list_ans'));
            // foreach($listAns as $ans){
            //     $answer = new Answer;

            //     $answer->ans_desc       = $ans->value;
            //     $answer->is_correct_ans = $ans->is_correct;
            //     $answer->ques_id        = $question_pool->id;
            //     $answer->cre_user       = $res->input('user_id');
            //     $answer->cre_date       = Carbon::now()->toDateTimeString();
            //     $answer->upd_user       = null;
            //     $answer->upd_date       = null;
            //     $answer->save();
            // }
            return response()->json(array(
                'success' => true, 
                // 'list_image' => $listImages, 
                // 'abc' => $abc,
                'def' => $def,
                'message' => 'Save successfull!'
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }
}