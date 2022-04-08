import React, { useState, useEffect } from 'react';
import { Button, Form, Loader, Container, Select, TextArea, Label, Radio, Image, Icon, Input } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Screen500 from '../Error/Screen500';
import InputNumber from 'react-input-just-numbers';
import { useParams } from "react-router-dom";
import FormData from 'form-data';
import axios from 'axios';
import MenuDiv from '../MenuDiv/MenuDiv';
import Screen404 from '../Error/Screen404';
import './Exam.css';
import Cookies from 'universal-cookie';

const cookies       = new Cookies();
const answer_arr    = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H'];
const option_add_ans= [
    {key: '1', value: '1', text: 'Add new question'},
    {key: '2', value: '2', text: 'Add question from Question pool'},
]

const ExamDetails = (props) => {
    try {
        const { exam_id }                           = useParams();
        const [typeAddQuestion, setTypeAddQuestion] = useState('');
        const [examInfor, setExamInfor]             = useState([]);
        const [majors, setMajors]                   = useState([]);
        const [examTypes, setExamTypes]             = useState([]);
        const [questions, setQuestions]             = useState([]);
        const [answers, setAnswers]                 = useState([]);
        const [isLoading, setLoading]               = useState(false);
        const [choosen, setChoosen]                 = useState(true);
        const [optionAddQues, setOptionAddQues]     = useState('');
        const [examName, setExamName]               = useState('');
        const [itTypeID, setITTypeID]               = useState('');
        const [examType, setExamType]               = useState('');
        const [examDesc, setExamDesc]               = useState('');
        const [typeID, setTypeID]                   = useState('');
        const [quesID, setQuesID]                   = useState('');
        const [quesText, setQuesText]               = useState('');
        const [quesPoint, setQuesPoint]             = useState('');
        const [quesImage, setQuesImage]             = useState([]);
        const [ansID, setAnsID]                     = useState('');
        const [ansDesc, setAnsDesc]                 = useState([]);
        const [isCorrectAns, setIsCorrectAns]       = useState();

        const user_id                               = cookies.get('user_id');
        const user_role                             = cookies.get('user_role');
        // let ans_index                               = 4;

        const url = "http://localhost/itenglish_capstone/server/public/api/refer_exam";

        useEffect(async () => {            
            let formData = new FormData();
            formData.append('exam_id', exam_id);
            await axios({
                method  : 'POST',
                url     : url,
                dataType: 'jsonp',
                data    : formData,
                config  : {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                    }
                }
            })
            .then(response => {
                let exams       = response.data.exam;
                let answers     = response.data.answers;
                let questions   = response.data.questions;
                let majors      = response.data.majors;
                let exam_types  = response.data.exam_types;
                setExamInfor(exams); 
                setMajors(majors);  
                setExamTypes(exam_types);       
                setAnswers(answers);  
                setQuestions(questions);   
                setIsCorrectAns('A')        
            })
            .catch(error => {
                console.log(error)
            });
        }, []);

        // const handleImageChange = (e) => {
        //     if (e.target.files) {
        //         setQuesImage(e.target.files)
        //         const fileArr = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
        //         setSelectedImages((prevImages) => prevImages.concat(fileArr))
        //         Array.from(e.target.files).map(
        //             (file) => URL.revokeObjectURL(file)
        //         )
        //     }
        // }

        // const renderPhotos = (source) => {
        //     return source.map((photo) => {
        //         return <Image className='ques-image-style' src={photo} key={photo} size='medium' />
        //     })
        // }

        const handleChangeSelect = (e, value) => {
            setIsCorrectAns(value.value);
        }   

        const handleOnChangeSelectAddQuestion = (e, data) => {
            setOptionAddQues(data.value);
            if(data.value !== undefined || data.value !== ''){
                setChoosen(false);
                setTypeAddQuestion(data.value);                
            }
        }    
        
        const handleClickMoveToAddQuestion = (e) => {
            if(typeAddQuestion == '1'){
                window.location.href = `/add-question/${exam_id}`
            }
            if(typeAddQuestion == '2'){
                window.location.href = `/add-from-question-pool/${exam_id}`
            }
        }

        // const handleAddAnswer = ()=>{
        //     if(ans_index <= 7){
        //         var pTag = document.createElement("p");
        //         pTag.innerHTML = '<div class="fields">' +
        //                             '<div class="three wide field">' +
        //                                 '<div class="ui radio checkbox">' +
        //                                     '<input class="hidden" name="radioGroup" readonly="" tabindex="0" type="radio" value="'+ answer_arr[ans_index] +'">' +
        //                                     '<label>Correct Answer</label>' +
        //                                 '</div>' +
        //                             '</div>' +
        //                             '<div class="twelve wide field">' +
        //                                 '<textarea name="ans_desc_'+ answer_arr[ans_index] +'" maxlength="1000" rows="3"></textarea>' +
        //                             '</div>' +
        //                             '<div width="1" class="ui red circular label" style="height: fit-content; margin-top: 5px; cursor: pointer">X</div>' +
        //                         '</div>'
        //         ans_index++;
        //         document.getElementById('div-answers').appendChild(pTag);
        //         return;
        //     }
        //     alert('Maximum answers is 8!')
        // }

        // const handleDeleteAnswer = (e, data) =>{
        //     e.target.parentElement.remove()
        // }

        // const handleSaveQuestion = (e) => {
        //     let listImages  = [];
        //     let listAns     = [];

        //     for(let i = 0; i < quesImage.length; i++){
        //         listImages.push(quesImage[0].name);
        //     }

        //     let list_ans        = document.getElementsByClassName('ques-ans');
        //     let list_isCorrect  = document.getElementsByClassName('rad-is-correct');
        //     for(let i = 0; i < list_ans.length; i++){
        //         listAns.push({
        //             ques_id     : '',
        //             value       : list_ans[i].children[0].value,
        //             is_correct  : list_isCorrect[i].classList.contains('checked')? '1' : '0'
        //         })
        //     }
        //     console.log(listAns)

        //     // if (quesPoint != '' 
        //     // && quesText != '' 
        //     // ){
        //     //     setLoading(true);
        //     //     let formData = new FormData();
        //     //     formData.append('ques_point', quesPoint);
        //     //     formData.append('ques_text', quesText);
        //     //     formData.append('ques_image', listImages.length > 0 ? JSON.stringify(listImages) : null);
        //     //     formData.append('b_day', this.state.b_day);
        //     //     formData.append('email', this.state.email);
        //     //     formData.append('password', this.state.password);
        //     //     formData.append('role', this.state.role);
    
        //     //     const url = 'http://localhost/itenglish_capstone/server/public/api/sign_up';
        //     //     axios({
        //     //         method  : 'POST',
        //     //         url     : url,
        //     //         dataType: 'jsonp',
        //     //         data    : formData,
        //     //         config  : {
        //     //             headers: {
        //     //                 'Content-Type': 'multipart/form-data',
        //     //                 'Access-Control-Allow-Origin': 'http://localhost:3000',
        //     //                 'Access-Control-Allow-Credentials': 'true',
        //     //                 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        //     //             }
        //     //         }
        //     //     })
        //     //     .then(response => {
        //     //         console.log(response)
        //     //     })
        //     //     .catch(error => {
        //     //         console.log(error)
        //     //     });
        //     // }
        // }

        return (
            <div className="exam_details pad-top-150">
                <Helmet>
                    <title>ITEnglish | Exam details</title>
                </Helmet>
                <MenuDiv />
                <Container className='div-exam-details mar-bot-20'>
                    <Label key='massive' size='massive' className='mar-bot-20'>Exam Information</Label>
                    <Form>                        
                        <Form.Group widths={2}>
                            <Form.Field
                                required
                                name='exam_id'
                                label='Exam ID'
                                control={Input}
                                value={exam_id}
                                disabled
                            />
                        </Form.Group>
                        {examInfor.map((key)=>{
                            return (
                                <div style={{marginBottom: 10}}>
                                    <Form.Field
                                        name='exam_name'
                                        label='Title'
                                        control={Input}
                                        placeholder='Exam title'
                                        maxLength="100"
                                        value={key.exam_name}
                                        // onChange={(e) => setExamName(e.target.value)}
                                    />
                                    <Form.Group widths={2}>
                                        <Form.Field
                                            required
                                            label='Kind of exam'
                                            control={Select}
                                            name='exam_type'
                                            className='exam_type'
                                            options={examTypes}
                                            onChange={handleChangeSelect}
                                            value={key.type_id}
                                        />
                                        <Form.Field
                                            required
                                            label='Major'
                                            control={Select}
                                            name='exam_major'
                                            className='exam_major'
                                            options={majors}
                                            onChange={handleChangeSelect}
                                            value={key.it_type_id}
                                        />
                                    </Form.Group>
                                    <Form.Field
                                        control={TextArea}
                                        label='Description'
                                        placeholder='Description about this exam...'
                                        value={key.exam_desc}
                                    />
                                    <Form.Group widths={2}>
                                        <Form.Select
                                            fluid
                                            label='Select to add new question'
                                            options={option_add_ans}
                                            placeholder='Select type'
                                            onChange={handleOnChangeSelectAddQuestion}
                                            value={optionAddQues}
                                        />
                                        <Form.Button 
                                            className='btn-add-question'
                                            label='Click to add'
                                            disabled={choosen}
                                            color='blue'
                                            onClick={handleClickMoveToAddQuestion}
                                        >Create...
                                        </Form.Button>
                                    </Form.Group>
                                </div>
                            )
                        })}                                                                         
                        <div style={{ textAlign: 'center' }}>
                            <Button type='submit' className='btn-register'>Save Exam Information</Button>
                        </div>                     
                    </Form>
                </Container>
                <Container className='div-exam-details mar-bot-20'>
                    <Label size='massive' className='mar-bot-20'>Questions List</Label>
                    {questions.map((ques, index)=>{
                        return (
                            <div style={{ marginTop: 20 }}>
                                <Button 
                                    className='btn-edit-question' 
                                    color='blue'>Edit
                                </Button><Button 
                                    className='btn-delete-question' 
                                    color='red'>Delete
                                </Button><Label 
                                    style={{ marginBottom: 10 }}>Question {index + 1}
                                </Label>  ({ques.ques_point}) points
                                <p hidden>{ques.ques_id}</p>
                                <p>{ques.ques_text}</p>
                                <div style={{ marginBottom: 10 }} className='result-image-ques'>
                                    {ques.ques_image != null? <Image className='ques-image-style' src={'/images/' + ques.ques_image} size='medium' /> :''}
                                </div>                                                                
                                {answers[index].map((ans, idx)=>{
                                    return(
                                        <div>
                                            <p hidden>{ans.ans_id}</p>
                                            <p>{answer_arr[idx]}. {ans.ans_desc} {ans.is_correct_ans == '1'? <Icon name='check' size='small' color='green' /> : ''}</p>
                                        </div>                                        
                                    )
                                })}
                            </div>
                        )
                    })}
                </Container>
                {/* <Container className='div-exam-questions'>
                    <Label size='massive' className='mar-bot-20'>Add/Edit Question</Label>
                    <Form>
                        <div className='div-one-question'>
                            <Form.Group width={3}>
                                <Form.Field
                                    required
                                    name='ques_point'
                                    label='Answer Point Value'
                                    control={Input}
                                    maxLength="4"
                                    type='number'
                                />                              
                            </Form.Group>
                            <Form.Field
                                required
                                name='ques_text'
                                label='Question Text'
                                control={TextArea}
                            />
                            <Form.Group>
                                <div className='field'>
                                    <label>Add a image of question</label>
                                </div>
                                <input
                                    type='file'
                                    onChange={handleImageChange}
                                    accept='image/*'
                                    hidden
                                    id="input_image_question"
                                    multiple
                                />
                                <label htmlFor='input_image_question'>
                                    <AddPhotoAlternateIcon />
                                </label>
                            </Form.Group>
                            <div style={{ marginBottom: 10 }} className='result-image-ques'>
                                {renderPhotos(selectedImages)}
                            </div>
                            <div id='div-answers'>
                                <Form.Group>
                                    <Form.Field width={3}>
                                        <Radio
                                            label='Correct Answer'
                                            name='radioGroup'
                                            value='A'
                                            checked={isCorrectAns === 'A'}
                                            onChange={handleChangeSelect}
                                            className='rad-is-correct'
                                        />
                                    </Form.Field>
                                    <Form.Field
                                        name='ans_desc_a'
                                        control={TextArea}
                                        maxLength="1000"
                                        width={13}
                                        required
                                        className='ques-ans'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field width={3}>
                                        <Radio
                                            label='Correct Answer'
                                            name='radioGroup'
                                            value='B'
                                            checked={isCorrectAns === 'B'}
                                            onChange={handleChangeSelect}
                                            className='rad-is-correct'
                                        />
                                    </Form.Field>
                                    <Form.Field
                                        name='ans_desc_b'
                                        control={TextArea}
                                        maxLength="1000"
                                        width={13}
                                        required
                                        className='ques-ans'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field width={3}>
                                        <Radio
                                            label='Correct Answer'
                                            name='radioGroup'
                                            value='C'
                                            checked={isCorrectAns === 'C'}
                                            onChange={handleChangeSelect}
                                            className='rad-is-correct'
                                        />
                                    </Form.Field>
                                    <Form.Field
                                        name='ans_desc_c'
                                        control={TextArea}
                                        maxLength="1000"
                                        width={13}
                                        className='ques-ans'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field width={3}>
                                        <Radio
                                            label='Correct Answer'
                                            name='radioGroup'
                                            value='D'
                                            checked={isCorrectAns === 'D'}
                                            onChange={handleChangeSelect}
                                            className='rad-is-correct'
                                        />
                                    </Form.Field>
                                    <Form.Field
                                        name='ans_desc_d'
                                        control={TextArea}
                                        maxLength="1000"
                                        width={13}
                                        className='ques-ans'
                                    />
                                </Form.Group>                                
                            </div>
                            <Label style={{cursor: 'pointer'}} color='blue' className='btn-add-answer' onClick={handleAddAnswer}>Add more answers</Label>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Button type='submit' className='btn-register' onClick={handleSaveQuestion}>Save Question</Button>
                        </div>
                    </Form>
                </Container> */}
                <div
                    style={{
                        textAlign: 'center',
                        paddingTop: 80,
                        paddingBottom: 20
                    }}
                >
                    <p>© ITEnglish Copyright 2022</p>
                </div>
            </div>
        )
    } catch (error) {
        return (
            // <Screen404 />
            console.log(error)
        )
    }
}

export default ExamDetails