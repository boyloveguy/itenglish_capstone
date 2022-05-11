import React, { useState, useEffect } from 'react';
import { Button, Form, Loader, Container, TextArea, Label, Radio, Image, Input } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useParams } from "react-router-dom";
import FormData from 'form-data';
import axios from 'axios';
import MenuDiv from '../MenuDiv/MenuDiv';
import './Exam.css';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

const cookies       = new Cookies();
const answer_arr    = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const max_answer    = 4;

const AddSpeaking = (props) => {
    const { exam_id, exam_type, add_type, ques_id } = useParams();
    const [selectedImages, setSelectedImages ]      = useState([]);
    const [question, setQuestion]                   = useState({
        typeAddQuestion : '',
        quesImage       : [],
        quesText        : '',
        isLoading       : false,
        quesPoint       : '',
        ansDesc         : [
            {
                ans_id  : '',
                ans_desc: ''
            }, 
            {
                ans_id  : '',
                ans_desc: ''
            },
            {
                ans_id  : '',
                ans_desc: ''
            },
            {
                ans_id  : '',
                ans_desc: ''
            },
        ],
        user_id         : cookies.get('user_id'),
        user_role       : cookies.get('user_role')
    })

    if(ques_id != 0){
        const url = "http://localhost:8000/api/refer_question";

        useEffect(async () => {            
            let formData = new FormData();
            formData.append('ques_id', ques_id);
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
                let quesInfo = response.data.questionInfo[0];
                let quesImage = (response.data.questionInfo[0].ques_image != null ? response.data.questionInfo[0].ques_image.split(',') : []);
                
                setQuestion(prev => ({
                    ...prev,
                    quesPoint: quesInfo.ques_point,
                    quesText: quesInfo.ques_text,
                    isLoading: false
                }))                

                if(quesImage.length > 0 && quesImage.length != ['']){
                    for(let i = 0; i < quesImage.length; i++){
                        quesImage[i] = '/images/exam/' + quesImage[i];
                    }
                    setSelectedImages(quesImage);
                }            
            })
            .catch(error => {            
                console.log(error)
            });
        }, []);
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            const fileArr = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setSelectedImages((prevImages) => prevImages.concat(fileArr))

            setQuestion(prev => ({
                ...prev,
                quesImage: e.target.files,
            }))

            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file)
            )
        }
    }

    const renderPhotos = (source) => {
        return source.map((photo) => {
            return <Image className='ques-image-style' src={photo} key={photo} size='medium' />
        })
    }

    const handleChangeQuesPoint = (e) =>{
        setQuestion(prev => ({
            ...prev,
            quesPoint: e.target.value
        }))
    }

    const handleChangeQuesText = (e) =>{
        setQuestion(prev => ({
            ...prev,
            quesText: e.target.value
        }))
    }

    const handleSaveQuestion = (e) => {
        try {
            if (    question.quesPoint  != '' 
                &&  question.quesText   != ''
            ){
                setQuestion(prev => ({
                    ...prev,
                    isLoading: true
                }))

                let formData = new FormData();
                formData.append('ques_point', question.quesPoint);
                formData.append('ques_text', question.quesText);
                formData.append('ques_type', exam_type);
                formData.append('user_id', question.user_id);
                formData.append('exam_id', exam_id);
                formData.append('add_type', add_type);
                formData.append('images_length', question.quesImage.length);  
                formData.append('ques_id', ques_id); 
                if(question.quesImage.length > 0){
                    for (let i = 0; i < question.quesImage.length; i++) {
                        formData.append('ques_image_' + i, question.quesImage[i]);
                    }
                }else{
                    formData.append('ques_image', null);
                }

                const url = 'http://localhost:8000/api/save_speaking';
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
                    
                    setQuestion(prev => ({
                        ...prev,
                        isLoading: false
                    }))

                    if(result){
                        Swal.fire({
                            title               : response.data.message,
                            icon                : 'success',
                            confirmButtonColor  : '#3085d6',
                            confirmButtonText   : add_type != '0' ? 'Go to Exam Detail Page': 'Go to Question Pool Page',
                            showDenyButton      : true,
                            denyButtonText      : `Continue add new question`,
                        }).then((results) => {
                            if (results.isConfirmed) {
                                if(add_type == '0'){
                                    window.location.href = `/add-from-question-pool/${exam_id}/${exam_type}`;
                                }else{
                                    window.location.href = `/exam-details/${exam_id}`;
                                }                            
                            }
                        })
                    }else{
                        Swal.fire({
                            icon    : 'error',
                            title   : 'Oops...',
                            text    : response.data.message
                        })
                    }
                })
                .catch(error => {
                    setQuestion(prev => ({
                        ...prev,
                        isLoading: false
                    }))

                    Swal.fire({
                        title   : 'Oops...',
                        text    : 'Server has problem! Please try another time.',
                        icon    : 'error'
                    })
                });
            }
        } catch (error) {
            console.log(error)
        }        
    }

    return (
        <div className="exam_details pad-top-150">
            <Helmet>
                <title>ITEnglish | Add speaking</title>
            </Helmet>
            <MenuDiv activeItem={'exams and tests'}/>
            <Loader active={question.isLoading} size='big'/>
            <Container className='div-exam-speaking mar-bot-20'>
                <div className='mar-bot-20'>
                    {add_type == '0'? '' : <Label size='big' color='teal' tag>Exam ID: {exam_id}</Label>}                    
                    <Label size='big' color='blue' tag>Add Speaking</Label>                   
                </div>
                <Form>
                    <div className='div-one-question'>
                        <Form.Group width={3}>
                            <Form.Field
                                required
                                name='ques_point'
                                label='Speaking Max Point Value'
                                control={Input}
                                maxLength="4"
                                type='number'
                                onChange={handleChangeQuesPoint}
                                value={question.quesPoint}
                            />
                        </Form.Group>
                        <Form.Field
                            required
                            name='ques_text'
                            label='Speaking Text'
                            control={TextArea}
                            onChange={handleChangeQuesText}
                            value={question.quesText}
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
                                name='ques_image'
                            />
                            <label htmlFor='input_image_question'>
                                <AddPhotoAlternateIcon />
                            </label>
                        </Form.Group>
                        <div style={{ marginBottom: 10 }} className='result-image-ques'>
                            {renderPhotos(selectedImages)}
                        </div>                        
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button type='submit' className='btn-register' onClick={handleSaveQuestion}>Save Question</Button>
                    </div>
                </Form>
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

export default AddSpeaking