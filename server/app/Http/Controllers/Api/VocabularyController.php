<?php
 
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\PartsOfSpeech;
use Illuminate\Http\Request;
use App\Models\Vocabulary;
use App\Models\VocabularyExample;
use App\Models\VocabularyITType;
use App\Models\VocabularyMeaning;
use App\Models\VocabularySpeech;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
 
class VocabularyController extends Controller
{
    function get_vocabulary(Request $res){
        try {
            $vocabulary = Vocabulary::all();
            $list_voca  = DB::table('vocabulary')
            ->join('vocabulary_speech', 'vocabulary_speech.voc_id', '=', 'vocabulary.voc_id')
            ->join('parts_of_speech', 'vocabulary_speech.pos_id', '=', 'parts_of_speech.pos_id')
            ->select('vocabulary.voc_id'
            ,   'vocabulary.voc_name'
            ,   'vocabulary.spelling')
            ->selectRaw('GROUP_CONCAT(parts_of_speech.pos_name) AS pos_name')
            ->where('vocabulary.voc_name', 'like', $res->first_word.'%')
            ->groupBy('vocabulary.voc_id' 
            ,   'vocabulary.voc_name'
            ,   'vocabulary.spelling'
            )->get();
            return response()->json(array(
                'vocabulary'    => $vocabulary,
                'list_voca'     => $list_voca
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e->getMessage()), 200);
        }
    }

    function get_vocabulary_by_word(Request $res){
        try {
            $list_voca  = DB::table('vocabulary')
            ->join('vocabulary_speech', 'vocabulary_speech.voc_id', '=', 'vocabulary.voc_id')
            ->join('parts_of_speech', 'vocabulary_speech.pos_id', '=', 'parts_of_speech.pos_id')
            ->select('vocabulary.voc_id'
            ,   'vocabulary.voc_name'
            ,   'vocabulary.spelling')
            ->selectRaw('GROUP_CONCAT(parts_of_speech.pos_name) AS pos_name')
            ->where('vocabulary.voc_name', 'like', $res->first_word.'%')
            ->groupBy('vocabulary.voc_id' 
            ,   'vocabulary.voc_name'
            ,   'vocabulary.spelling'
            )->get();
            return response()->json(array(
                'list_voca'     => $list_voca
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e->getMessage()), 200);
        }
    }

    function get_info(Request $res){
        try {
            $voc_id = $res->input('voc_id');
            $parts_of_speech = DB::table('parts_of_speech')
            ->select('pos_id as value',
            'pos_name as label')
            ->get();

            $majors = DB::table('it_type')          
            ->select('it_type.it_type_id as value'
            , 'it_type.type_name as label'
            )->get();

            $voc_info = array();
            $pos_list = array();
            $major_list = array();
            $meaning_list = array();
            $example_list = array();
            if($voc_id != '0'){
                $voc_info = DB::table('vocabulary')
                ->select('vocabulary.voc_name'
                ,   'vocabulary.spelling'
                ,   'vocabulary.voc_id'
                )->where('vocabulary.voc_id', '=', $res->input('voc_id'))->get();

                $pos_list = DB::table('parts_of_speech')
                ->join('vocabulary_speech', 'vocabulary_speech.pos_id', '=', 'parts_of_speech.pos_id')
                ->join('vocabulary', 'vocabulary.voc_id', '=', 'vocabulary_speech.voc_id')
                ->select('parts_of_speech.pos_id as value'
                ,   'parts_of_speech.pos_name as label'
                )->where('vocabulary.voc_id', '=', $res->input('voc_id'))->get();

                $major_list = DB::table('it_type')
                ->join('vocabulary_it_type', 'vocabulary_it_type.it_type_id', '=', 'it_type.it_type_id')
                ->join('vocabulary', 'vocabulary_it_type.voc_id', '=', 'vocabulary.voc_id')
                ->select('it_type.it_type_id as value'
                ,   'it_type.type_name as label'
                )->where('vocabulary.voc_id', '=', $res->input('voc_id'))->get();

                $meaning_list = DB::table('vocabulary_meaning')
                ->join('vocabulary', 'vocabulary_meaning.voc_id', '=', 'vocabulary.voc_id')
                ->select('vocabulary_meaning.id'
                ,   'vocabulary_meaning.meaning as vocValue'
                )->where('vocabulary_meaning.voc_id', '=', $res->input('voc_id'))->get();

                $example_list = DB::table('vocabulary_example')
                ->join('vocabulary', 'vocabulary_example.voc_id', '=', 'vocabulary.voc_id')
                ->select('vocabulary_example.id'
                ,   'vocabulary_example.example as vocValue'
                )->where('vocabulary_example.voc_id', '=', $res->input('voc_id'))->get();
            }

            return response()->json(array(
                'parts_of_speech' => $parts_of_speech,
                'majors' => $majors,
                'voc_info' => $voc_info,
                'pos_list' => $pos_list,
                'major_list' => $major_list,
                'meaning_list' => $meaning_list,
                'example_list' => $example_list
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array('error' => $e->getMessage()), 200);
        }
    }

    function save_vocabulary(Request $res){
        try {
            $voc_id         = $res->input('voc_id');
            $list_pos       = array();
            $list_majors    = array();

            //insert
            if($voc_id == '0'){
                $vocabulary             = new Vocabulary();
                $vocabulary->voc_name   = $res->input('voc_name');
                $vocabulary->spelling   = $res->input('spelling');                
                $vocabulary->cre_date   = Carbon::now()->toDateTimeString();
                $vocabulary->cre_user   = $res->input('user_id');
                $vocabulary->upd_user   = null;
                $vocabulary->upd_date   = null;
                $vocabulary->save();
                
                //parts_of_speech
                $list_pos   = json_decode($res->input("parts_of_speech"));
                foreach($list_pos as $value){
                    $voc_speech            = new VocabularySpeech;
                    $voc_speech->voc_id    = $vocabulary->id;
                    $voc_speech->pos_id    = $value->value;
                    $voc_speech->save();
                }                

                //table vocabulary_it_type
                $list_majors = json_decode($res->input("majors"));
                if(count($list_majors) > 0){
                    foreach($list_majors as $value){
                        $voc_it_type                = new VocabularyITType;
                        $voc_it_type->voc_id        = $vocabulary->id;
                        $voc_it_type->it_type_id    = $value->value;
                        $voc_it_type->save();
                    }
                }

                //table vocabulary_meaning           
                $list_meaning = json_decode($res->input("list_meaning"));
                if(count($list_meaning) > 0){
                    foreach($list_meaning as $value){
                        $voc_meaning                = new VocabularyMeaning;
                        $voc_meaning->voc_id        = $vocabulary->id;
                        $voc_meaning->meaning       = $value;
                        $voc_meaning->cre_date      = Carbon::now()->toDateTimeString();
                        $voc_meaning->cre_user      = $res->input('user_id');
                        $voc_meaning->upd_user      = null;
                        $voc_meaning->upd_date      = null;
                        $voc_meaning->save();
                    }
                }

                //table vocabulary_example                
                $list_example = json_decode($res->input("list_example"));
                if(count($list_example) > 0){
                    foreach($list_example as $value){
                        $voc_example                = new VocabularyExample;
                        $voc_example->voc_id        = $vocabulary->id;
                        $voc_example->example       = $value;
                        $voc_example->cre_date      = Carbon::now()->toDateTimeString();
                        $voc_example->cre_user      = $res->input('user_id');
                        $voc_example->upd_user      = null;
                        $voc_example->upd_date      = null;
                        $voc_example->save();
                    }
                }

                $voc_id = $vocabulary->id;
            }
            //update
            else{
                Vocabulary::where('voc_id', $voc_id)
                ->update([
                    'voc_name'     => $res->input('voc_name'),
                    'voc_desc'     => !empty($res->input('voc_desc')) ? $res->input('voc_desc') : '',
                    'spelling'    => $res->input('spelling'),
                    'upd_user'      => $res->input('user_id'),
                    'upd_date'      => Carbon::now()->toDateTimeString()
                ]);

                VocabularySpeech::where('voc_id', '=', $voc_id)->delete();
                VocabularyITType::where('voc_id', '=', $voc_id)->delete();
                //parts_of_speech
                $list_pos   = json_decode($res->input("parts_of_speech"));
                foreach($list_pos as $value){
                    $voc_speech            = new VocabularySpeech;
                    $voc_speech->voc_id    = $voc_id;
                    $voc_speech->pos_id    = $value->value;
                    $voc_speech->save();
                }                

                //table vocabulary_it_type
                $list_majors = json_decode($res->input("majors"));
                if(count($list_majors) > 0){
                    foreach($list_majors as $value){
                        $voc_it_type                = new VocabularyITType;
                        $voc_it_type->voc_id        = $voc_id;
                        $voc_it_type->it_type_id    = $value->value;
                        $voc_it_type->save();
                    }
                }
            }

            return response()->json(array(
                'success' => true, 
                'message' => 'Save successfull!', 
                'voc_id' => $voc_id,
                'list_meaning' => $list_meaning,
                'list_example' => $list_example
            ), 200);
        } catch (\Exception $e) {
            return response()->json(array(
                'success' => false, 
                'message' => 'An error occurred', 
                'error' => $e->getMessage()
            ), 200);
        }
    }

    function delete_vocabulary(Request $res){
        try {
            $voc_id = $res->input('voc_id');
            VocabularySpeech::where('voc_id', '=', $voc_id)->delete();
            VocabularyITType::where('voc_id', '=', $voc_id)->delete();
            Vocabulary::where('voc_id', '=', $voc_id)->delete();

            return response()->json(array('success' => true, 'message' => 'Delete successfull!'), 200);
        } catch (\Exception $e) {
            return response()->json(array('success' => false, 'message' => 'An error occurred', 'error' => $e->getMessage()), 200);
        }
    }
}