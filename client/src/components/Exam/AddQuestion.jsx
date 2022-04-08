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

const cookies = new Cookies();
const answer_arr    = ['A', 'B', 'C', 'D', 'E', 'F','G', 'H'];

const AddQuestion = (props) => {
    const { exam_id } = useParams();
    const [selectedImages, setSelectedImages]   = useState([]);
    const [isCorrectAns, setIsCorrectAns]       = useState();
    const [quesImage, setQuesImage]             = useState([]);
    let ans_index                               = 4;

    const handleChangeSelect = (e, value) => {
        setIsCorrectAns(value.value);
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            setQuesImage(e.target.files)
            const fileArr = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
            setSelectedImages((prevImages) => prevImages.concat(fileArr))
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

    const handleAddAnswer = ()=>{
        if(ans_index <= 7){
            var pTag = document.createElement("p");
            var divDelete = document.createElement('div');
            // divDelete.addEventListener('click', handleDeleteAnswer);
            // divDelete.innerHTML = '<div width="1" class="ui red circular label" style="height: fit-content; margin-top: 5px; cursor: pointer">X</div>';
            pTag.innerHTML = '<div class="fields">' +
                                '<div class="three wide field">' +
                                    '<div class="ui radio checkbox">' +
                                        '<input class="hidden" name="radioGroup" readonly="" tabindex="0" type="radio" value="'+ answer_arr[ans_index] +'">' +
                                        '<label>Correct Answer</label>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="twelve wide field">' +
                                    '<textarea name="ans_desc_'+ answer_arr[ans_index] +'" maxlength="1000" rows="3"></textarea>' +
                                '</div>' +
                                '<div class="btn-del-add-ans" width="1" class="ui red circular label" style="height: fit-content; margin-top: 5px; cursor: pointer">X</div>' +
                                divDelete +
                            '</div>'
            ans_index++;
            document.getElementById('div-answers').appendChild(pTag);
            // document.getElementsByClassName('btn-del-add-ans').onClick(handleDeleteAnswer);
            return;
        }
        alert('Maximum answers is 8!')
    }

    const handleDeleteAnswer = (e, data) =>{
        e.target.parentElement.remove()
    }

    const handleSaveQuestion = (e) => {
        let listImages  = [];
        let listAns     = [];

        for(let i = 0; i < quesImage.length; i++){
            listImages.push(quesImage[0].name);
        }

        let list_ans        = document.getElementsByClassName('ques-ans');
        let list_isCorrect  = document.getElementsByClassName('rad-is-correct');
        for(let i = 0; i < list_ans.length; i++){
            listAns.push({
                ques_id     : '',
                value       : list_ans[i].children[0].value,
                is_correct  : list_isCorrect[i].classList.contains('checked')? '1' : '0'
            })
        }
        console.log(listAns)

        // if (quesPoint != '' 
        // && quesText != '' 
        // ){
        //     setLoading(true);
        //     let formData = new FormData();
        //     formData.append('ques_point', quesPoint);
        //     formData.append('ques_text', quesText);
        //     formData.append('ques_image', listImages.length > 0 ? JSON.stringify(listImages) : null);
        //     formData.append('b_day', this.state.b_day);
        //     formData.append('email', this.state.email);
        //     formData.append('password', this.state.password);
        //     formData.append('role', this.state.role);

        //     const url = 'http://localhost/itenglish_capstone/server/public/api/sign_up';
        //     axios({
        //         method  : 'POST',
        //         url     : url,
        //         dataType: 'jsonp',
        //         data    : formData,
        //         config  : {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //                 'Access-Control-Allow-Origin': 'http://localhost:3000',
        //                 'Access-Control-Allow-Credentials': 'true',
        //                 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        //             }
        //         }
        //     })
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     });
        // }
    }

    return (
        <div className="exam_details pad-top-150">
            <Helmet>
                <title>ITEnglish | Add questions</title>
            </Helmet>
            <MenuDiv />
            <Container className='div-exam-questions'>
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
                    <Label style={{ cursor: 'pointer' }} color='blue' className='btn-add-answer' onClick={handleAddAnswer}>Add more answers</Label>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button type='submit' className='btn-register' onClick={handleSaveQuestion}>Save Question</Button>
                </div>
            </Form>
        </Container>
        </div>        
    )
}

export default AddQuestion