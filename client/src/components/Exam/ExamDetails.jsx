import React, { useState, useEffect } from 'react';
import { Button, Form, Loader, Container, Select, TextArea, Label, Image, Icon, Input } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { useParams } from "react-router-dom";
import FormData from 'form-data';
import axios from 'axios';
import MenuDiv from '../MenuDiv/MenuDiv';
import './Exam.css';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'

const cookies       = new Cookies();
const answer_arr    = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H'];
const option_add_ans= [
    {key: '1', value: '1', text: 'Add new question'},
    {key: '2', value: '2', text: 'Add question from Question pool'},
]

const ExamDetails = (props) => {
    try {
        const { exam_id }  = useParams();
        const [exam, setExam] = useState({
            typeAddQuestion : '',
            examInfor       : [],
            majors          : [],
            examTypes       : [],
            questions       : [],
            answers         : [],
            isLoading       : true,
            choosen         : true,
            optionAddQues   : '',
            examName        : '',
            itTypeID        : '',
            examType        : '',
            examDesc        : '',
            user_id         : cookies.get('user_id'),
            user_role       : cookies.get('user_role'),
            examName        : '',
            examDesc        : '',
            itTypeID        : '',
            examType        : ''
        })

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
                let answer      = response.data.answers;
                let question    = response.data.questions;
                let major       = response.data.majors;
                let exam_types  = response.data.exam_types;
                setExam(prev => ({
                    ...prev,
                    examInfor   : exams, 
                    answers     : answer, 
                    questions   : question, 
                    majors      : major, 
                    examTypes   : exam_types
                }))

                exams.map((key)=>{
                    setExam(prev => ({
                        ...prev,
                        examName    : key.exam_name,
                        examDesc    : key.exam_desc,
                        itTypeID    : key.it_type_id,
                        examType    : key.type_id,
                        isLoading   : false
                    }))
                })
            })
            .catch(error => {
                setExam(prev => ({
                    ...prev,
                    isLoading: false
                }))
                console.log(error)
            });
        }, []);        

        const handleChangeExamName = (e) =>{
            setExam(prev => ({
                ...prev,
                examName: e.target.value
            }))
        }

        const handleChangeExamDesc = (e) =>{
            setExam(prev => ({
                ...prev,
                examDesc: e.target.value
            }))
        }

        const handleChangeSelectExamType = (e, data) => {
            setExam(prev => ({
                ...prev,
                examType: data.value
            }))
        }  
        
        const handleChangeSelectExamITType = (e, data) => {
            setExam(prev => ({
                ...prev,
                itTypeID: data.value
            }))
        }

        const handleOnChangeSelectAddQuestion = (e, data) => {
            setExam(prev => ({
                ...prev,
                optionAddQues: data.value
            }))
            if(data.value !== undefined || data.value !== ''){                 
                setExam(prev => ({
                    ...prev,
                    choosen: false,
                    typeAddQuestion: data.value
                }))
            }
        }    
        
        const handleClickMoveToAddQuestion = (e) => {
            try {
                if(exam.typeAddQuestion == '1'){
                    window.location.href = `/add-question/${exam_id}`
                }
                if(exam.typeAddQuestion == '2'){
                    window.location.href = `/add-from-question-pool/${exam_id}`
                }
            } catch (error) {
                console.log(error)
            }
        }

        const handleSaveExam = () => {
            if(exam.examName != ''
            && exam.examDesc != ''
            && exam.itTypeID != ''
            && exam.examType != ''
            && exam_id       != ''
            ){
                setExam(prev => ({
                    ...prev,
                    isLoading: true
                }))

                let formData = new FormData();
                formData.append('exam_id', exam_id);
                formData.append('exam_name', exam.examName);
                formData.append('exam_desc', exam.examDesc);
                formData.append('exam_major', exam.itTypeID);
                formData.append('exam_type', exam.examType);
                formData.append('user_id', exam.user_id);
                formData.append('type_save', 1);

                const url_save_exam = 'http://localhost/itenglish_capstone/server/public/api/save_exam';

                axios({
                    method  : 'POST',
                    url     : url_save_exam,
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
                    var result = response.data.success;   
                    
                    setExam(prev => ({
                        ...prev,
                        isLoading: false
                    }))

                    if(result){
                        Swal.fire({
                            icon                : 'success',
                            title               : response.data.message,
                            showConfirmButton   : false,
                            timer               : 1500
                        })
                    }else{
                        Swal.fire({
                            icon    : 'error',
                            title   : 'Oops...',
                            text    : response.data.message,
                        })
                    }
                })
                .catch(error => {
                    setExam(prev => ({
                        ...prev,
                        isLoading: false
                    }))

                    Swal.fire({
                        icon    : 'error',
                        title   : 'Oops...',
                        text    : error.data.message
                    })
                });
            }else{
                console.log(112)
            }
        }

        const handleDeleteExam = () => {
            try {
                Swal.fire({
                    title: 'Are you sure want to delete this exam?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result1) => {
                    if (result1.isConfirmed) {
                        setExam(prev => ({
                            ...prev,
                            isLoading: true
                        }))
    
                        let formData = new FormData();
                        formData.append('exam_id', exam_id);
    
                        const url_delete_exam = 'http://localhost/itenglish_capstone/server/public/api/delete_exam';
    
                        axios({
                            method  : 'POST',
                            url     : url_delete_exam,
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
                            var result2 = response.data.success;   
                            
                            setExam(prev => ({
                                ...prev,
                                isLoading: false
                            }))
    
                            if(result2){
                                Swal.fire({
                                    title: response.data.message,
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Go to Exam Page'
                                }).then((result3) => {
                                    if (result3.isConfirmed) {
                                        window.location.href = `/exam`
                                    }
                                })
                            }else{
                                Swal.fire({
                                    icon    : 'error',
                                    title   : 'Oops...',
                                    text    : 'Something went wrong!'
                                })
                            }
                        })
                        .catch(error => {
                            setExam(prev => ({
                                ...prev,
                                isLoading: false
                            }))
    
                            Swal.fire({
                                icon    : 'error',
                                title   : 'Oops...',
                                text    : error.data.message
                            })
                        });    
                    }
                })
            } catch (error) {
                console.log(error)
            }            
        }

        return (
            <div className="exam_details pad-top-150">
                <Helmet>
                    <title>ITEnglish | Exam details</title>
                </Helmet>
                <MenuDiv />
                <Loader active={exam.isLoading} size='big'/>
                <Container className='div-exam-details mar-bot-20'>
                    <Label size='big' color='teal' tag className='mar-bot-20'>Exam Information</Label>
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
                        <div style={{ marginBottom: 10 }}>
                            <Form.Field
                                name='exam_name'
                                label='Title'
                                control={Input}
                                placeholder='Exam title'
                                maxLength="100"
                                value={exam.examName}
                                onChange={handleChangeExamName}
                                required
                            />
                            <Form.Group widths={2}>
                                <Form.Field
                                    required
                                    label='Kind of exam'
                                    control={Select}
                                    name='exam_type'
                                    className='exam_type'
                                    options={exam.examTypes}
                                    onChange={handleChangeSelectExamType}
                                    value={exam.examType}
                                />
                                <Form.Field
                                    required
                                    label='Major'
                                    control={Select}
                                    name='exam_major'
                                    className='exam_major'
                                    options={exam.majors}
                                    onChange={handleChangeSelectExamITType}
                                    value={exam.itTypeID}
                                />
                            </Form.Group>
                            <Form.Field
                                control={TextArea}
                                label='Description'
                                placeholder='Description about this exam...'
                                value={exam.examDesc}
                                onChange={handleChangeExamDesc}
                            />
                            <Form.Group widths={2}>
                                <Form.Select
                                    fluid
                                    label='Select to add new question'
                                    options={option_add_ans}
                                    placeholder='Select type'
                                    onChange={handleOnChangeSelectAddQuestion}
                                    value={exam.optionAddQues}
                                />
                                <Form.Button
                                    className='btn-add-question'
                                    label='Click to add'
                                    disabled={exam.choosen}
                                    color='blue'
                                    onClick={handleClickMoveToAddQuestion}
                                >Create...
                                </Form.Button>
                            </Form.Group>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={handleSaveExam} type='submit' color='green' className='btn-save-exam' style={{marginRight: 10}}>Save</Button>
                            <Button onClick={handleDeleteExam} type='submit' color='red' className='btn-delete-exam'>Delete</Button>
                        </div>                     
                    </Form>
                </Container>
                <Container className='div-exam-details mar-bot-20'>
                    <Label size='big' color='teal' tag className='mar-bot-20'>Questions List</Label>
                    {exam.questions.map((ques, index)=>{
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
                                {exam.answers[index].map((ans, idx)=>{
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
    } catch (error) {
        return (
            console.log(error)
        )
    }
}

export default ExamDetails