import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { Checkbox } from '@material-ui/core';
import { Button, Loader } from 'semantic-ui-react';
import './Exam.css';
import Cookies from 'universal-cookie';
import { Helmet } from 'react-helmet';
import MenuDiv from '../MenuDiv/MenuDiv';
import { useParams } from "react-router-dom";
import { Container} from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

const cookies = new Cookies();

const columns = [
    { field: 'ques_id'  , title: 'ID'       , width: 50 },
    { field: 'ques_text', title: 'Question' , width: 400 },
    { field: 'user_name', title: 'Author'   , width: 100 },
    { field: 'cre_date' , title: 'Date'     , width: 100, type: 'date' }
]

const AddFromQuestionPool = (props) => {    
    const { exam_id, examType }    = useParams();

    const [question_pool, setQuestionPool] = useState({
        filter          : false,
        isLoading       : true,
        tableData       : [],
        isDisabled      : true,
        selectedQuestion: []
    }); 

    const url = "http://localhost:8000/api/get_question_pool";
    useEffect(() => {        
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ques_type   : examType,
                user_id     : cookies.get('user_id'),
                exam        : exam_id,                
            })
        })
        .then((data) => data.json())
        .then((data) => {
            setQuestionPool(prev => ({
                ...prev,
                tableData: data.question_pool,
                isLoading: false
            }))
        })
        .catch(error => {
            console.log(error);
            setQuestionPool(prev => ({
                ...prev,
                isLoading: false
            }))
        });
    }, []);

    const handleChange = () => {
        setQuestionPool(prev => ({
            ...prev,
            filter: !(question_pool.filter)
        }))
    }

    const handleClickEditExam = (data) => {
        try {
            // window.location.href = `/exam-details/${data.exam_id}`
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickAddNewQuestion = () => {
        try {       
            if(examType === 1){
                window.location.href = `/add-question/${exam_id}/${examType}/${0}/${0}`
            }
            if(examType === 2){
                window.location.href = `/add-speaking/${exam_id}/${examType}/${0}/${0}`
            }         
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickAddQuestion = () => {
        try {
            let formData = new FormData();
            formData.append('exam_id', exam_id);
            formData.append('user_id', cookies.get('user_id'));
            formData.append('ques_type', examType);
            formData.append('selected_questions', JSON.stringify(question_pool.selectedQuestion));
            const url = 'http://localhost:8000/api/add_from_question_pool';
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
                    
                    setQuestionPool(prev => ({
                        ...prev,
                        isLoading: false
                    }))

                    if(result){
                        setQuestionPool(prev => ({
                            ...prev,
                            tableData: response.data.question_pool
                        }))

                        Swal.fire({
                            title               : response.data.message,
                            icon                : 'success',
                            confirmButtonColor  : '#3085d6',
                            confirmButtonText   : 'Go to Exam Detail Page',
                            showDenyButton      : true,
                            denyButtonText      : `Continue add new question`,
                        }).then((results) => {
                            if (results.isConfirmed) {
                                window.location.href = `/exam-details/${exam_id}`;                           
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
                    setQuestionPool(prev => ({
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
            console.log(error)
        }
    }

    const handleSelectedQuestions = (data) => {
        try {
            if(data.length === 0){
                setQuestionPool(prev => ({
                    ...prev,
                    isDisabled: true
                }))
            }else{
                setQuestionPool(prev => ({
                    ...prev,
                    isDisabled: false
                }))
            }
            setQuestionPool(prev => ({
                ...prev,
                selectedQuestion: data
            }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="exam_details pad-top-150">
            <Helmet>
                <title>ITEnglish | Question Pool</title>
            </Helmet>
            <MenuDiv activeItem={'exams and tests'}/>
            <Container style={{marginBottom: 20, textAlign: 'right'}}>
                <Button color='primary' onClick={handleClickAddNewQuestion}>Add new question</Button>
            </Container>
            <Container className="div_exam" style={{minHeight: 500, maxHeight: 1000}}>
                <div className="exam_table">
                    <Loader active={question_pool.isLoading} size='big' />                    
                    <MaterialTable
                        title='Question Pool'
                        data={question_pool.tableData}
                        columns={columns}
                        options={{
                            filtering: question_pool.filter,
                            actionsColumnIndex: -1,
                            selection: true,
                            paging: false,
                            maxBodyHeight: 800,
                        }}
                        onSelectionChange={(selectedRows)=>{handleSelectedQuestions(selectedRows)}}
                        onRowClick={(event, rowData) => console.log(rowData)}
                        actions={[
                            {
                                icon: () => <Checkbox
                                    checked={question_pool.filter}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-lable': 'primary checkbox' }}
                                />,
                                tooltip: "Hide/Show Filter option",
                                isFreeAction: true
                            }
                        ]}
                    />
                </div>
                <div style={{marginTop: 20, textAlign: 'right'}}>
                    <Button 
                        color='primary' 
                        onClick={handleClickAddQuestion}
                        disabled={question_pool.isDisabled}
                    >Add selected question to Exam ({exam_id})
                    </Button>
                </div>
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

export default AddFromQuestionPool