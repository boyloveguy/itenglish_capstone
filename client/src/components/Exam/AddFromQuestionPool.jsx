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

const cookies = new Cookies();
const columns = [
    { field: 'ques_id', title: 'ID', width: 80 },
    { field: 'ques_text', title: 'Question', width: 300 },
    { field: 'cre_user', title: 'Author', width: 150 },
    { field: 'cre_date', title: 'Date', width: 150, type: 'date' }
]

const AddFromQuestionPool = (props) => {
    const [filter, setFilter] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const { exam_id } = useParams();
    const { user_id } = cookies.get('user_id');
    const { user_role } = cookies.get('user_role');
    console.log(cookies.get('user_id'))

    const url = "http://localhost/itenglish_capstone/server/public/api/get_question_pool";
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: cookies.get('user_id')
            })
        })
        .then((data) => data.json())
        .then((data) => {
            setTableData(data.exam);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, []);

    const handleChange = () => {
        setFilter(!filter)
    }

    const handleClickEditExam = (data) => {
        try {
            // window.location.href = `/exam-details/${data.exam_id}`
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="exam_details pad-top-150">
            <Helmet>
                <title>ITEnglish | Add questions</title>
            </Helmet>
            <MenuDiv />
            <Container className="div_exam">
                <div className="exam_table">
                    <Loader active={isLoading} size='big' />
                    <MaterialTable
                        title='Exams List'
                        data={tableData}
                        columns={columns}
                        options={{
                            filtering: filter,
                            actionsColumnIndex: -1
                        }}
                        onRowClick={(event, rowData) => console.log(rowData)}
                        actions={[
                            {
                                icon: () => <Checkbox
                                    checked={filter}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-lable': 'primary checkbox' }}
                                />,
                                tooltip: "Hide/Show Filter option",
                                isFreeAction: true
                            },
                            {
                                icon: () => <Button color='blue'>Edit</Button>,
                                tooltip: 'Edit Exam',
                                onClick: (e, data) => handleClickEditExam(data)
                            }
                        ]}
                    />
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