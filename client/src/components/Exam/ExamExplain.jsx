import React, { useState, useEffect } from 'react';
import { Button, Loader, Container, Header, Table} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import './Exam.css';
import { useParams } from "react-router-dom";
import MenuDiv from '../MenuDiv/MenuDiv';
import axios from 'axios';
import Swal from 'sweetalert2';

const ExamExplain = (props) => {
    const { exam_id }               = useParams();
    const [examInfo, setExamInfo]   = useState({
        exam_name   : '',
        exam_desc   : '',
        exam_type   : '',
        author      : '',
        ques_num    : '',
        major       : '',
        cre_date    : '',
        type_id     : '',
        isLoading   : true
    })

    const url = "http://localhost/itenglish_capstone/server/public/api/refer_exam_explain";

    useEffect(async () => {
        try {
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
                var result = response.data.success;
                if(result){
                    let exam_info           = response.data.exam_info;
                    let number_questions    = response.data.number_questions;

                    exam_info.map((key)=>{
                        setExamInfo(prev => ({
                            ...prev,
                            exam_name   : key.exam_name,
                            exam_desc   : key.exam_desc,
                            exam_type   : key.type_name,
                            author      : key.user_name,
                            ques_num    : number_questions,
                            major       : key.major,
                            cre_date    : key.cre_date,
                            type_id     : key.type_id,
                            isLoading   : false
                        }))
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

    const handleClickDoExam = () => {
        try {
            window.location.href = `/do-exam/${exam_id}`
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="exam-explain pad-top-150">
            <Helmet>
                <title>ITEnglish | Exam explain</title>
            </Helmet>
            <MenuDiv activeItem={'exams and tests'} />
            <Loader active={examInfo.isLoading} size='big'/>
            <Container className='div-exam-explain mar-bot-20'>
                <Header as='h1'>{examInfo.exam_name}</Header>
                <p>{examInfo.exam_desc}</p>
                <Table definition>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width={4}>Exam form</Table.Cell>
                            <Table.Cell>{examInfo.type_id == '1'? 'Multichoice questions' : 'Pronouce'}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Author</Table.Cell>
                            <Table.Cell>{examInfo.author}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Number of questions</Table.Cell>
                            <Table.Cell>{examInfo.ques_num}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Major</Table.Cell>
                            <Table.Cell>{examInfo.major}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Created date</Table.Cell>
                            <Table.Cell>{examInfo.cre_date}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Button color='yellow' onClick={handleClickDoExam}>Begin</Button>
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

export default ExamExplain