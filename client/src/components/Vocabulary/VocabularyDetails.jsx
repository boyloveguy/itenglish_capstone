import React, { useState, useEffect } from 'react';
import { Button, Loader, Container, Input, Form, TextArea, Label } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import './Vocabulary.css';
import MenuDiv from '../MenuDiv/MenuDiv';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import Select, { StylesConfig } from 'react-select';
import AddRemoveInputField from './AddRemoveInputField';

const cookies = new Cookies();

const VocabularyDetails = (props) => {
    const { voc_id } = useParams();
    const [vocDetails, setVocDetails] = useState({
        isLoading: true,
        voc_name: "",
        parts_of_speech: [],
        spelling: "",
        majors: [],
        list_majors: [],
        list_parts_of_speech: [],
        user_id: cookies.get("user_id"),
        user_role: cookies.get("user_role"),
        voc_id: voc_id,
        voc_examples: [],
        voc_meanings: [],
    });

    const url = "http://localhost:8000/api/get_info";

    useEffect(() => {
        setTimeout(
            () => {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        voc_id: vocDetails.voc_id
                    })
                })
                    .then((data) => data.json())
                    .then((data) => {
                        setVocDetails(prev => ({
                            ...prev,
                            list_parts_of_speech: data.parts_of_speech,
                            list_majors: data.majors,
                            isLoading: false,
                            parts_of_speech: data.pos_list,
                            majors: data.major_list,
                            voc_examples: data.meaning_list,
                            voc_meanings: data.example_list
                        }));
        
                        data.voc_info.map((key)=>{
                            setVocDetails(prev => ({
                                ...prev,
                                voc_name: key.voc_name,
                                spelling: key.spelling,
                                voc_id: key.voc_id
                            }));
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        setVocDetails(prev => ({
                            ...prev,
                            isLoading: false
                        }))
                    });
            }, 
            3000
        );        
    }, []);

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setVocDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangeSelectSpeech = (option: Option[], actionMeta: ActionMeta<Option>) => {
        setVocDetails(prev => ({
            ...prev,
            parts_of_speech: option
        }));

        console.log(option);
    }

    const handleChangeSelectMajor = (option: Option[], actionMeta: ActionMeta<Option>) => {
        setVocDetails(prev => ({
            ...prev,
            majors: option
        }));
    }

    const validate = () => {
        if (vocDetails.voc_name === ""
            || vocDetails.parts_of_speech.length === 0
            || vocDetails.spelling === ""
            || !checkEmptyList("meaning")
            || !checkEmptyList("example")
        ) {
            return false;
        }
        return true;
    }

    const checkEmptyList= (type) => {
        let list = getList(type);
        for(let i = 0; i < list.length; i++){
            if(list[i] === ""){
                return false;
            }
        }
        return true;
    }

    const getList = (type) => {
        let list_meaning = [];
        const list = document.getElementsByClassName(type);
        for(let i = 0; i < list.length; i++){
            list_meaning.push(list[i].children.vocValue.value);
        }
        return list_meaning;
    }

    const handleSaveVoca = () => {
        try {            
            Swal.fire({
                title               : 'Are you sure want to save this?',
                text                : "Check carefully before save!",
                icon                : 'warning',
                showCancelButton    : true,
                confirmButtonColor  : '#3085d6',
                cancelButtonColor   : '#d33',
                confirmButtonText   : 'Save'
            }).then((results) => {
                if (results.isConfirmed) {
                    if (validate) {
                        setVocDetails(prev => ({
                            ...prev,
                            isLoading: true
                        }));
        
                        let formData = new FormData();
                        formData.append('voc_id', vocDetails.voc_id);
                        formData.append('voc_name', vocDetails.voc_name);
                        formData.append('parts_of_speech', JSON.stringify(vocDetails.parts_of_speech));
                        formData.append('spelling', vocDetails.spelling);
                        formData.append('majors', JSON.stringify(vocDetails.majors));
                        formData.append('user_id', vocDetails.user_id);
                        formData.append('list_meaning', JSON.stringify(getList("meaning")));
                        formData.append('list_example', JSON.stringify(getList("example")));
            
                        const url = 'http://localhost:8000/api/save_vocabulary';
                        axios({
                            method: 'POST',
                            url: url,
                            dataType: 'jsonp',
                            data: formData,
                            config: {
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
        
                            setVocDetails(prev => ({
                                ...prev,
                                isLoading: false
                            }))
        
                            if (result) {
                                Swal.fire({
                                    title: response.data.message,
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Go to Vocabulary Detail page' ,
                                    showDenyButton: true,
                                    denyButtonText: `Add new Vocabulary`,
                                }).then((results) => {
                                    if (results.isConfirmed) {
                                        window.location.href = `/vocabulary`;
                                    }
        
                                    if(results.isDenied){                                
                                        setVocDetails(prev => ({
                                            ...prev,
                                            voc_name: "",
                                            parts_of_speech: [],
                                            spelling: "",
                                            majors: [],
                                            voc_id: 0
                                        }));
                                    }
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: response.data.message + " " + response.data.error
                                })
                            }
                        })
                        .catch(error => {
                            setVocDetails(prev => ({
                                ...prev,
                                isLoading: false
                            }))
        
                            Swal.fire({
                                title: 'Oops...',
                                text: 'Server has problem! Please try another time.',
                                icon: 'error'
                            })
                        });
                    }
                }
            })            
        } catch (error) {
            console.log(error);
        }        
    }

    const handleDeleteVoca = () => {
        try {
            Swal.fire({
                title               : 'Are you sure want to delete this?',
                text                : "You won't be able to revert this!",
                icon                : 'warning',
                showCancelButton    : true,
                confirmButtonColor  : '#3085d6',
                cancelButtonColor   : '#d33',
                confirmButtonText   : 'Yes, delete it!'
            }).then((results) => {
                if (results.isConfirmed) {
                        setVocDetails(prev => ({
                            ...prev,
                            isLoading: true
                        }));
        
                        let formData = new FormData();
                        formData.append('voc_id', vocDetails.voc_id);
            
                        const url = 'http://localhost:8000/api/delete_vocabulary';
                        axios({
                            method: 'POST',
                            url: url,
                            dataType: 'jsonp',
                            data: formData,
                            config: {
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
        
                            setVocDetails(prev => ({
                                ...prev,
                                isLoading: false
                            }))
        
                            if (result) {
                                Swal.fire({
                                    title: response.data.message,
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Go to Vocabulary page' ,
                                    showDenyButton: true,
                                    denyButtonText: `Add new Vocabulary`,
                                }).then((results) => {
                                    if (results.isConfirmed) {
                                        window.location.href = `/vocabulary`;
                                    }
        
                                    if(results.isDenied){                                
                                        setVocDetails(prev => ({
                                            ...prev,
                                            voc_name: "",
                                            parts_of_speech: [],
                                            spelling: "",
                                            majors: [],
                                            voc_id: 0
                                        }));
                                    }
                                })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: response.data.message + " " + response.data.error
                                })
                            }
                        })
                        .catch(error => {
                            setVocDetails(prev => ({
                                ...prev,
                                isLoading: false
                            }))
        
                            Swal.fire({
                                title: 'Oops...',
                                text: 'Server has problem! Please try another time.',
                                icon: 'error'
                            })
                        });
                }
            })            
        } catch (error) {
            console.log(error);
        }        
    };

    return (
        <div className="pad-top-150">
            <Helmet>
                <title>ITEnglish | Vocabulary Details</title>
            </Helmet>
            <MenuDiv activeItem={'learn'} />
            <Loader active={vocDetails.isLoading} size='big' />
            <Container className='div-voca mar-bot-20'>
                <Label size='big' color='blue' tag className='mar-bot-20'>Vocabulary Information</Label>
                <Form>
                    <Form.Group widths={2}>
                        <Form.Field
                            required
                            name='voc_id'
                            label='Vocabulary ID'
                            control={Input}
                            value={vocDetails.voc_id}
                            disabled
                        />
                    </Form.Group>
                    <div style={{ marginBottom: 10 }}>
                        <Form.Group widths={2}>
                            <Form.Field
                                name='voc_name'
                                label='Vocabulary Name'
                                control={Input}
                                placeholder='Vocabulary Name'
                                maxLength="100"
                                value={vocDetails.voc_name}
                                onChange={handleChange}
                                required
                            />
                            <Form.Field
                                required
                                label='Spelling'
                                control={Input}
                                name='spelling'
                                className='spelling'
                                maxLength="100"
                                onChange={handleChange}
                                value={vocDetails.spelling}
                                placeholder="Spelling"
                            />
                        </Form.Group>
                        <label style={{ fontWeight: 700, color: "rgba(0,0,0,.87)" }}>Parts of Speech *</label>
                        <Select
                            isMulti
                            options={vocDetails.list_parts_of_speech}
                            className="basic-multi-select pos-voca"
                            classNamePrefix="select"
                            required
                            onChange={handleChangeSelectSpeech}
                            value={vocDetails.parts_of_speech}
                        />
                        <label style={{ fontWeight: 700, color: "rgba(0,0,0,.87)" }}>Of Majors</label>
                        <Select
                            isMulti
                            options={vocDetails.list_majors}
                            className="basic-multi-select pos-voca"
                            classNamePrefix="select"
                            required
                            onChange={handleChangeSelectMajor}
                            value={vocDetails.majors}
                        />
                        <label style={{ fontWeight: 700, color: "rgba(0,0,0,.87)" }}>Meanings</label>
                        <AddRemoveInputField className="meaning" nameClass="vocValue" placeholder='Infomation of vocabulary...' value={vocDetails.voc_meanings}/>
                        <label style={{ fontWeight: 700, color: "rgba(0,0,0,.87)" , marginTop: 15}}>Examples
                        </label>
                        <AddRemoveInputField className="example" nameClass="vocValue" placeholder='Example of vocabulary...' value={vocDetails.voc_examples}/>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            onClick={handleSaveVoca}
                            type='submit'
                            color='primary'
                            className='btn-save-exam'
                            style={{ marginRight: 10 }}
                        >Save</Button>
                        <Button
                            onClick={handleDeleteVoca}
                            type='submit'
                            color='red'
                            className='btn-delete-exam'
                        >Delete
                        </Button>
                    </div>
                </Form>
            </Container>
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
}

export default VocabularyDetails