<?php
 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\Answer;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\ExamPoint;
use App\Models\QuestionPool;
use App\Models\Question;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
 
class ExamController extends Controller
{
    function select_all(Request $res){
        try {
            $exams = DB::table('exam')
            ->join('it_type','it_type.it_type_id','=','exam.it_type_id')
            ->join('exam_type','exam_type.type_id','=','exam.type_id') 
            ->join('users','users.id','=','exam.cre_user')           
            ->select('exam.exam_id'
            , 'exam.exam_name'
            , 'it_type.type_name as major_name'
            , 'exam_type.type_name as type_exam'
            , 'exam_type.type_name as submit_times'
            , 'users.user_name'
            , 'exam.cre_date'
            )->get();            
            return response()->json(array('exam' => $exams), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e), 200);
        }
    }

    function refer_exam($exam_id){
        try {
            $exams = array();
            $questions = array();
            $answers = array();
            $question_pool = array();

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

            if($exam_id != '0'){
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
            $type_save  = $res->input('type_save');
            $exam_id    = '';
            //update
            if($type_save == '1'){
                $exam_id = $res->input('exam_id');
                Exam::where('exam_id', $exam_id)
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
                $exam = new Exam;
                $exam->exam_name    = $res->input('exam_name');
                $exam->it_type_id   = $res->input('exam_major');
                $exam->type_id      = $res->input('exam_type');
                $exam->exam_desc    = !empty($res->input('exam_desc')) ? $res->input('exam_desc') : '';
                $exam->cre_date     = Carbon::now()->toDateTimeString();
                $exam->cre_user     = $res->input('user_id');
                $exam->upd_user     = null;
                $exam->upd_date     = null;
                $exam->save();

                $exam_id = $exam->id;
            }
            return response()->json(array('success' => true, 'message' => 'Save successfull!', 'exam_id' =>$exam_id), 200);
        } catch (\Exception $e) {
            return response()->json(array('success' => false, 'message' => 'An error occurred', 'error' => $e), 200);
        }
    }

    function delete_exam(Request $res){
        try {
            $exam_id = $res->input('exam_id');
            Question::where('exam_id', '=', $exam_id)->delete();
            Exam::where('exam_id', '=', $exam_id)->delete();

            return response()->json(array('success' => true, 'message' => 'Delete successfull!'), 200);
        } catch (\Exception $e) {
            return response()->json(array('success' => false, 'message' => 'An error occurred', 'error' => $e), 200);
        }
    }

    function remove_question(Request $res){
        try {
            $exam_id = $res->input('exam_id');
            $ques_id = $res->input('ques_id');

            Question::where('exam_id', '=', $exam_id)
            ->where('ques_id', '=', $ques_id)->delete();

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

            return response()->json(array(
                'success'   => true, 
                'message'   => 'Delete successfull!',
                'questions' => $questions,
                'answers'   => $answers
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array('success' => false, 'message' => 'An error occurred', 'error' => $e), 200);
        }
    }

    function save_question(Request $res){
        try {
            define('DOCROOT', $_SERVER['DOCUMENT_ROOT'].'/itenglish_capstone/client/public/images/exam/');
            $list_image         = '';
            $imagesLength       =  $res->input('images_length');

            //mode update
            if($res->input('ques_id') != '0'){
                $ques_id = $res->input('ques_id');
                $exam_id = $res->input('exam_id');

                //delete image in folder 
                if($imagesLength > 0){
                    for( $i = 0; $i < $imagesLength; $i++){
                        $target_file = DOCROOT . basename($_FILES['ques_image_'.$i]["name"]);
                        if(file_exists($target_file)){
                            unlink($target_file);
                        }

                        move_uploaded_file($_FILES['ques_image_'.$i]["tmp_name"], $target_file);

                        if($list_image != ''){
                            $list_image = $list_image.','.($_FILES['ques_image_'.$i]["name"]);
                        }else{
                            $list_image = $_FILES['ques_image_'.$i]["name"];
                        }                    
                    }
                }

                QuestionPool::where('ques_id', $ques_id)
                ->update([
                    'ques_text'  => $res->input('ques_text'),
                    'ques_image' => $imagesLength > 0 ? $list_image : null,
                    'ques_type'  => $res->input('ques_type'),
                    'upd_date'   => Carbon::now()->toDateTimeString(),
                    'upd_user'   => $res->input('user_id')
                ]);

                Question::where('ques_id', $ques_id)
                ->where('exam_id', $exam_id)
                ->update([
                    'ques_point' => $res->input('ques_point'),
                    'upd_date'   => Carbon::now()->toDateTimeString(),
                    'upd_user'   => $res->input('user_id')
                ]);

                $listAns = json_decode($res->input('list_ans'));
                foreach($listAns as $ans){
                    Answer::where('ans_id', $ans->ans_id)
                    ->update([
                        'ans_desc'          => $ans->value,
                        'is_correct_ans'    => $ans->is_correct,
                        'upd_date'          => Carbon::now()->toDateTimeString(),
                        'upd_user'          => $res->input('user_id')
                    ]);
                }
            }
            //mode insert
            else{                
                $question       = new Question;
                $question_pool  = new QuestionPool;                
                
                //upload image to folder public/images/exam 
                if($imagesLength > 0){
                    for( $i = 0; $i < $imagesLength; $i++){
                        $target_file = DOCROOT . basename($_FILES['ques_image_'.$i]["name"]);                    
                        move_uploaded_file($_FILES['ques_image_'.$i]["tmp_name"], $target_file);

                        if($list_image != ''){
                            $list_image = $list_image.','.($_FILES['ques_image_'.$i]["name"]);
                        }else{
                            $list_image = $_FILES['ques_image_'.$i]["name"];
                        }                    
                    }
                }            
                
                //add to table "question_pool"
                $question_pool->ques_text   = $res->input('ques_text');
                $question_pool->ques_image  = $imagesLength > 0 ? $list_image : null;
                $question_pool->ques_type   = $res->input('ques_type');
                $question_pool->cre_user    = $res->input('user_id');
                $question_pool->cre_date    = Carbon::now()->toDateTimeString();
                $question_pool->upd_user    = null;
                $question_pool->upd_date    = null;
                $question_pool->save();            
                
                //just do when add question to exam (if click add new question button from question_pool add_type == '0')
                if($res->input('add_type') != '0'){     
                    //add to table "question"           
                    $question->ques_id      = $question_pool->id;
                    $question->exam_id      = $res->input('exam_id');
                    $question->ques_point   = $res->input('ques_point');
                    $question->cre_user     = $res->input('user_id');
                    $question->cre_date     = Carbon::now()->toDateTimeString();
                    $question->upd_user     = null;
                    $question->upd_date     = null;
                    $question->save();
                }

                //add to table "answer"
                $listAns = json_decode($res->input('list_ans'));
                foreach($listAns as $ans){
                    $answer = new Answer;

                    $answer->ans_desc       = $ans->value;
                    $answer->is_correct_ans = $ans->is_correct;
                    $answer->ques_id        = $question_pool->id;
                    $answer->cre_user       = $res->input('user_id');
                    $answer->cre_date       = Carbon::now()->toDateTimeString();
                    $answer->upd_user       = null;
                    $answer->upd_date       = null;
                    $answer->save();
                }
            }

            return response()->json(array(
                'success' => true, 
                'message' => 'Save successfull!'
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }

    function get_question_pool(Request $res){
        try {
            //get questions from 'question_pool' table not add to 'question' table yet
            $ques_not_add_yet = DB::table('question_pool')
            ->join('users','users.id','=','question_pool.cre_user')
            ->leftJoin('question', 'question_pool.ques_id', '=', 'question.ques_id')
            ->select('question_pool.ques_id'
            , 'question_pool.ques_text'
            , 'question_pool.cre_date'
            , 'users.user_name'
            )
            ->where('question_pool.cre_user', '=', $res->input('user_id'))
            ->where('question_pool.ques_type', '=', $res->input('ques_type'))
            ->whereNull('question.ques_id');
            
            //get question added to 'question' table but not add to exam
            $ques_added = DB::table('question_pool')
            ->join('users','users.id','=','question_pool.cre_user')
            ->join('question', 'question_pool.ques_id', '=', 'question.ques_id')
            ->select('question_pool.ques_id'
            , 'question_pool.ques_text'
            , 'question_pool.cre_date'
            , 'users.user_name')
            ->where('question_pool.cre_user', '=', $res->input('user_id'))
            ->where('question_pool.ques_type', '=', $res->input('ques_type'))
            ->whereNotIn('question.ques_id', 
                DB::table('question')
                ->select('question.ques_id')
                ->where('question.exam_id', '=', $res->input('exam'))
            );

            $result = $ques_not_add_yet->union($ques_added)->get();

            return response()->json(array(
                'question_pool' => $result
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }

    function add_from_question_pool(Request $res){
        try {
            $selected_questions = json_decode($res->input('selected_questions'));

            foreach($selected_questions as $ques){
                $question               = new Question;
                $question->ques_id      = $ques->ques_id;
                $question->exam_id      = $res->input('exam_id');
                $question->ques_point   = '2.0';
                $question->cre_user     = $res->input('user_id');
                $question->cre_date     = Carbon::now()->toDateTimeString();
                $question->upd_user     = null;
                $question->upd_date     = null;
                $question->save();
            }

            $ques_not_add_yet = DB::table('question_pool')
            ->join('users','users.id','=','question_pool.cre_user')
            ->leftJoin('question', 'question_pool.ques_id', '=', 'question.ques_id')
            ->select('question_pool.ques_id'
            , 'question_pool.ques_text'
            , 'question_pool.cre_date'
            , 'users.user_name'
            )
            ->where('question_pool.cre_user', '=', $res->input('user_id'))
            ->where('question_pool.ques_type', '=', $res->input('ques_type'))
            ->whereNull('question.ques_id');
            
            //get question added to 'question' table but not add to exam
            $ques_added = DB::table('question_pool')
            ->join('users','users.id','=','question_pool.cre_user')
            ->join('question', 'question_pool.ques_id', '=', 'question.ques_id')
            ->select('question_pool.ques_id'
            , 'question_pool.ques_text'
            , 'question_pool.cre_date'
            , 'users.user_name')
            ->where('question_pool.cre_user', '=', $res->input('user_id'))
            ->where('question_pool.ques_type', '=', $res->input('ques_type'))
            ->whereNotIn('question.ques_id', 
                DB::table('question')
                ->select('question.ques_id')
                ->where('question.exam_id', '=', $res->input('exam_id'))
            );

            $result = $ques_not_add_yet->union($ques_added)->get();

            return response()->json(array(
                'question_pool' => $result,
                'success'       => true, 
                'message'       => 'Save successfull!'
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }

    function refer_exam_explain(Request $res){
        try {
            $exam_info = DB::table('exam')
            ->join('users','users.id','=','exam.cre_user')
            ->join('it_type','it_type.it_type_id','=','exam.it_type_id')
            ->join('exam_type','exam_type.type_id','=','exam.type_id')
            ->select('exam.exam_name'
            , 'exam.exam_desc'
            , 'exam.cre_date'
            , 'users.user_name'
            , 'exam.type_id'
            , 'it_type.type_name as major'
            , 'exam_type.type_name'
            )->where('exam.exam_id', '=', $res->input('exam_id'))->get();

            $number_questions = DB::table('question')
            ->where('question.exam_id', '=', $res->input('exam_id'))->get();

            return response()->json(array(
                'exam_info'         => $exam_info,
                'number_questions'  => count($number_questions),
                'success'           => true, 
                'message'           => 'Successfull!'
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }

    function refer_do_exam(Request $res){
        try {
            $exam_id = $res->input('exam_id');

            $exam_title = DB::table('exam')
            ->select('exam.exam_name')
            ->where('exam.exam_id', '=', $exam_id)->get();

            $exam_type = DB::table('exam')
            ->select('exam.type_id')
            ->where('exam.exam_id', '=', $exam_id)->get();

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

            return response()->json(array(
                'exam_title'      => $exam_title,
                'questions'       => $questions,
                'answers'         => $answers,
                'exam_type'       => $exam_type,
                'success'         => true, 
                'message'         => 'Successfull!'
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }

    function refer_question(Request $res){
        try {
            $questionInfo = DB::table('question_pool')
            ->join('question','question_pool.ques_id','=','question.ques_id')     
            ->select('question_pool.ques_text'
            , 'question.ques_point'
            , 'question_pool.ques_image'
            )->distinct()->where('question_pool.ques_id','=', $res->input('ques_id'))->get();  

            $answers = DB::table('answer')
            ->select('answer.ans_id'
            , 'answer.ans_desc'        
            , 'answer.is_correct_ans'    
            )->where('ques_id','=', $res->input('ques_id'))->get();

            return response()->json(array(
                'questionInfo'  => $questionInfo,
                'answers'       => $answers
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }

    function save_speaking(Request $res){
        try {
            define('DOCROOT1', $_SERVER['DOCUMENT_ROOT'].'/itenglish_capstone/client/public/images/exam/');
            $list_image     = '';
            $imagesLength   =  $res->input('images_length');

            //mode update
            if($res->input('ques_id') != '0'){
                $ques_id = $res->input('ques_id');
                $exam_id = $res->input('exam_id');

                //delete image in folder 
                if($imagesLength > 0){
                    for( $i = 0; $i < $imagesLength; $i++){
                        $target_file = DOCROOT . basename($_FILES['ques_image_'.$i]["name"]);
                        if(file_exists($target_file)){
                            unlink($target_file);
                        }

                        move_uploaded_file($_FILES['ques_image_'.$i]["tmp_name"], $target_file);

                        if($list_image != ''){
                            $list_image = $list_image.','.($_FILES['ques_image_'.$i]["name"]);
                        }else{
                            $list_image = $_FILES['ques_image_'.$i]["name"];
                        }                    
                    }
                }

                QuestionPool::where('ques_id', $ques_id)
                ->update([
                    'ques_text'  => $res->input('ques_text'),
                    'ques_image' => !empty($res->input('exam_desc')) ? $res->input('exam_desc') : '',
                    'ques_type'  => $res->input('ques_type'),
                    'upd_date'   => Carbon::now()->toDateTimeString(),
                    'upd_user'   => $res->input('user_id')
                ]);

                Question::where('ques_id', $ques_id)
                ->where('ques_id', $exam_id)
                ->update([
                    'ques_point'  => $res->input('ques_point'),
                    'upd_date'   => Carbon::now()->toDateTimeString(),
                    'upd_user'   => $res->input('user_id')
                ]);
            }
            //mode insert
            else{                
                $question       = new Question;
                $question_pool  = new QuestionPool;                
                
                //upload image to folder public/images/exam 
                if($imagesLength > 0){
                    for( $i = 0; $i < $imagesLength; $i++){
                        $target_file = DOCROOT1 . basename($_FILES['ques_image_'.$i]["name"]);                    
                        move_uploaded_file($_FILES['ques_image_'.$i]["tmp_name"], $target_file);

                        if($list_image != ''){
                            $list_image = $list_image.','.($_FILES['ques_image_'.$i]["name"]);
                        }else{
                            $list_image = $_FILES['ques_image_'.$i]["name"];
                        }                    
                    }
                }            
                
                //add to table "question_pool"
                $question_pool->ques_text   = $res->input('ques_text');
                $question_pool->ques_image  = $list_image;
                $question_pool->ques_type   = $res->input('ques_type');
                $question_pool->cre_user    = $res->input('user_id');
                $question_pool->cre_date    = Carbon::now()->toDateTimeString();
                $question_pool->upd_user    = null;
                $question_pool->upd_date    = null;
                $question_pool->save();            
                
                //just do when add question to exam (if click add new question button from question_pool add_type == '0')
                if($res->input('add_type') != '0'){     
                    //add to table "question"           
                    $question->ques_id      = $question_pool->id;
                    $question->exam_id      = $res->input('exam_id');
                    $question->ques_point   = $res->input('ques_point');
                    $question->cre_user     = $res->input('user_id');
                    $question->cre_date     = Carbon::now()->toDateTimeString();
                    $question->upd_user     = null;
                    $question->upd_date     = null;
                    $question->save();
                }
            }

            return response()->json(array(
                'success' => true, 
                'message' => 'Save successfull!'
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }

    function submit_exam_point(Request $res){
        try {
            $exam_point             = new ExamPoint;
            $exam_point->exam_id    = $res->input('exam_id');
            $exam_point->user_id    = $res->input('user_id');
            $exam_point->point      = $res->input('point');
            $exam_point->cre_user   = $res->input('user_id');
            $exam_point->cre_date   = Carbon::now()->toDateTimeString();
            $exam_point->upd_user   = null;
            $exam_point->upd_date   = null;
            $exam_point->save();

            return response()->json(array(
                'success' => true, 
                'message' => 'Submit Point successfull!'
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => $e->getMessage()
            ), 200);
        }
    }
}