import React, { useState, useEffect} from 'react';
import { Button, Loader, Container, Label, Radio} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import './Exam.css';
import { useParams } from "react-router-dom";
import MenuDiv from '../MenuDiv/MenuDiv';
import axios from 'axios';
import Swal from 'sweetalert2';
import SpeechToText from './SpeechToText';
import Cookies from 'universal-cookie';

const cookies       = new Cookies();
const answer_arr    = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H'];

const DoExam = (props) => {
    const { exam_id }               = useParams();
    const [examInfo, setExamInfo]   = useState({
        answers     : [], 
        questions   : [],
        isLoading   : true,
        exam_title  : '',
        checked     : [],
        correct_ans : [],
        exam_type   : ''
    });

    const url = "http://localhost/itenglish_capstone/server/public/api/refer_do_exam";

    useEffect(async () => {
        try {
            let formData = new FormData();
            formData.append('exam_id', exam_id);
            await axios({
                method: 'POST',
                url: url,
                dataType: 'jsonp',
                data: formData,
                config: {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                    }
                }
            })
            .then(response => {
                var result = response.data.success;

                setExamInfo(prev => ({
                    ...prev,
                    isLoading: false
                }))

                if(result){
                    let exam_title = response.data.exam_title;
                    let exam_type  = response.data.exam_type;
                    let temp_type = '';
                    exam_title.map((key)=>{
                        setExamInfo(prev => ({
                            ...prev,
                            exam_title  : key.exam_name,
                        })) 
                    })

                    exam_type.map((key)=>{
                        setExamInfo(prev => ({
                            ...prev,
                            exam_type  : key.type_id,
                        })) 

                        temp_type = key.type_id;
                    })

                    setExamInfo(prev => ({
                        ...prev,
                        questions   : response.data.questions
                    }))

                    if(temp_type === 1) {
                        setExamInfo(prev => ({
                            ...prev,
                            answers     : response.data.answers,
                            checked     : handleSetChecked(response.data.answers),
                            correct_ans : handleSetCorrectAns(response.data.answers)
                        }))
                    }                    
                }else{
                    setExamInfo(prev => ({
                        ...prev,
                        isLoading: false
                    }))

                    Swal.fire({
                        icon    : 'error',
                        title   : 'Oops...',
                        text    : 'Something went wrong!'
                    })
                }
            })
            .catch(error => {         
                setExamInfo(prev => ({
                    ...prev,
                    isLoading: false
                }))

                Swal.fire({
                    icon    : 'error',
                    title   : 'Oops...',
                    text    : error.data.message
                })
            });
        } catch (error) {
            console.log(error)
        }        
    }, []);

    const handleSetChecked = (data) =>{
        let ans_num = data.length;
        let temp_arr = [];
        for(let i = 0; i < ans_num; i++){
            temp_arr.push({
                ques_id: '',
                ans_id: '',
                ques_point: 0
            });
        }
        return temp_arr;
    }

    const handleSetCorrectAns = (data) => {
        let ans_num = data;
        let temp_arr = [];
        for (let i = 0; i < ans_num.length; i++) {
            for (let j = 0; j < 4; j++) {
                if (ans_num[i][j].is_correct_ans === '1') {
                    temp_arr.push({
                        ques_id: ans_num[i][j].ques_id,
                        ans_id: ans_num[i][j].ans_id,
                        is_correct: ans_num[i][j].is_correct_ans
                    })
                }
            }
        }
        return temp_arr;
    }

    const handleOnChangeChecked = (index, ans_id, ques_id, ques_point) => (event) => {
        try {
            let tmp_arr = examInfo.checked;
            for(let i = 0; i < tmp_arr.length; i++){
                if(i === index){
                    tmp_arr[i] = {
                        ques_id: ques_id,
                        ans_id: ans_id,
                        ques_point: ques_point
                    }
                }
            }
            
            setExamInfo(prev => ({
                ...prev,
                checked: tmp_arr
            }));
        } catch (error) {
            console.log(error)
        }        
    }

    const handleClickSubmit = () => {
        try {
            Swal.fire({
                title               : 'Are you sure want to submit the exam?',
                icon                : 'question',
                showCancelButton    : true,
                confirmButtonColor  : '#3085d6',
                cancelButtonColor   : '#d33',
                confirmButtonText   : 'Submit',
                cancelButtonText    : 'No, I want to continue.'
            }).then((results1) => {
                if (results1.isConfirmed) {
                    let final_point = 0;
                    let max_point   = 0;

                    if(examInfo.exam_type === 1){
                        for(let i = 0; i < examInfo.checked.length; i++){
                            max_point += parseFloat(examInfo.checked[i].ques_point);
                            if( examInfo.checked[i].ques_id === examInfo.correct_ans[i].ques_id &&
                                examInfo.checked[i].ans_id === examInfo.correct_ans[i].ans_id
                            ){
                                final_point += parseFloat(examInfo.checked[i].ques_point);
                            }
                        }
                    }else{
                        let result_text         = document.getElementsByClassName('microphone-result-text')[0].innerHTML;
                        let ques_text           = document.getElementsByClassName('ques-text')[0].innerHTML;
                        let stringSimilarity    = require("string-similarity");
                        let similarity          = stringSimilarity.compareTwoStrings(result_text, ques_text);
                        max_point               = 100;
                        final_point             = Math.round(similarity * 100);
                    }                    
                    
                    //store user exam point
                    handleSubmitExamPoint(final_point);

                    Swal.fire({
                        imageUrl            : final_point < (max_point/2) ? '/images/try_next.png' : '/images/congra.jpg',
                        imageWidth          : final_point < (max_point/2) ? 150 : 400,
                        imageHeight         : 150,
                        imageAlt            : 'Custom image',
                        title               : 'Your point is: ' + final_point + '/' + max_point,
                        text                : final_point < (max_point/2) ? 'Better luck next time!' : 'Very good!',
                        confirmButtonColor  : '#3085d6',
                        confirmButtonText   : 'Go to Rank page',
                        showDenyButton      : true,
                        denyButtonText      : `Do another exam`,
                    }).then((results) => {
                        if (results.isConfirmed) {
                                                        
                        }
                        if(results.isDenied){
                            window.location.href = `/exam`
                        }
                    })                        
                }
            })            
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitExamPoint = (point) => {
        try {
            setExamInfo(prev => ({
                ...prev,
                isLoading: true
            }))

            let formData = new FormData();
            formData.append('exam_id', exam_id);
            formData.append('user_id', cookies.get('user_id'));
            formData.append('point', point);

            const url = 'http://localhost/itenglish_capstone/server/public/api/submit_exam_point';
            axios({
                method  : 'POST',
                url     : url,
                dataType: 'jsonp',
                data    : formData,
                config  : {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                    }
                }
            })
            .then(response => {
                var result = response.data.success;   
                
                setExamInfo(prev => ({
                    ...prev,
                    isLoading: false
                }))

                if(result){
                    console.log(response.data.message)
                }else{
                    console.log(response.data.message)
                }
            })
            .catch(error => {
                setExamInfo(prev => ({
                    ...prev,
                    isLoading: false
                }))

                Swal.fire({
                    title   : 'Oops...',
                    text    : 'Server has problem! Please try another time.',
                    icon    : 'error'
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleReferImages = (images, parentDiv) => {
        try {
            // setTimeout(() => {
                let images_arr = images.split(",");
                let divTag = document.createElement('div');
                divTag.className = 'result-image-ques-do-exam';              
                divTag.innerHTML    = '';                
                for (let i = 0; i < images_arr.length; i++) {
                    divTag.innerHTML += '<img class="ui medium image ques-image-style" src="/images/exam/' + images_arr[i] + '" alt="Improve your Vocabulary">';
                }
                document.getElementsByClassName(parentDiv)[0].appendChild(divTag)
            // }, 0);                 
        } catch (error) {
            console.log(error)
        }
    }   

    return (
        <div className="exam-explain pad-top-150">
            <Helmet>
                <title>ITEnglish | {examInfo.exam_title}</title>
            </Helmet>
            <MenuDiv activeItem={'exams and tests'} />
            <Loader active={examInfo.isLoading} size='big'/>
            <Container className='div-exam-explain mar-bot-20'>
                {examInfo.exam_type === 1 ?
                    examInfo.questions.map((ques, index) => {
                        return (
                            <div style={{ marginTop: 20 }}>
                                <Label
                                    style={{ marginBottom: 10 }}>Question {index + 1}
                                </Label>  ({ques.ques_point}) points
                                <p hidden>{ques.ques_id}</p>
                                <p>{ques.ques_text}</p>
                                {/* <div
                                    style={{ marginBottom: 10 }}
                                    className={'ques-' + index}
                                >      
                                    {(ques.ques_image != null && ques.ques_image != '') ?
                                    handleReferImages(ques.ques_image, 'ques-' + index)
                                : ''}
                                </div>                             */}
                                {
                                examInfo.answers.length > 0 ? 
                                examInfo.answers[index].map((ans, idx) => {
                                    return (
                                        <div>
                                            <p hidden>{ans.ans_id}</p>
                                            <Radio
                                                label={answer_arr[idx] + '. ' + ans.ans_desc}
                                                name={'radioGroup' + index}
                                                value={ans.ans_id}
                                                checked={examInfo.checked[index].ans_id === ans.ans_id}
                                                onChange={handleOnChangeChecked(index, ans.ans_id, ques.ques_id, ques.ques_point)}
                                            />
                                        </div>
                                    )
                                })
                                : ''
                                }                            
                            </div>
                        )
                    })
                    :
                    examInfo.questions.map((ques, index) => {
                        return(
                            <div style={{ marginTop: 20 }}>
                                <Label
                                    style={{ marginBottom: 10 }}
                                >Please read this paragraph below
                                </Label>  ({ques.ques_point}) points
                                <p hidden>{ques.ques_id}</p>
                                <p className='ques-text'>{ques.ques_text}</p>
                                <SpeechToText quesID={ques.ques_id}/>                                                            
                            </div>
                        )
                    })
                }
                                
                <Button style={{marginTop: 20}} color='primary' onClick={handleClickSubmit}>Submit</Button>
            </Container>
            <div
                style={{
                    textAlign       : 'center',
                    paddingTop      : 80,
                    paddingBottom   : 20
                }}
            >
                <p>© ITEnglish Copyright 2022</p>
            </div>
        </div>
    )
}

export default DoExam