import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { Checkbox} from '@material-ui/core';
import { Button, Loader} from 'semantic-ui-react';
import './Exam.css';

const columns = [
    {field: 'exam_id', title: 'ID', width: 80},
    {field: 'exam_name', title: 'Title', width: 300},
    {field: 'major_name', title: 'Major', width: 150},
    {field: 'type_exam', title: 'Kind', width: 100},
    {field: 'submit_times', title: 'Submit', width: 120},
    {field: 'user_name', title: 'Author', width: 120},
    {field: 'cre_date', title: 'Date', width: 150, type: 'date'}
]

const ExamTable = (props) =>{  
    const [filter, setFilter]       = useState(false);
    const [isLoading, setLoading]   = useState(true);
    const [tableData, setTableData] = useState([]);
    const [examID, setExamID]       = useState(123);
    const url = "http://localhost/itenglish_capstone/server/public/api/exam";
    useEffect(() => {
        fetch(url)
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

    const handleChange=()=>{
        setFilter(!filter)
    }

    const handleClickEditExam=(data)=>{
        try {
            window.location.href = `/exam-details/${data.exam_id}`
        } catch (error) {
            console.log(error)
        }        
    }

    return (   
        <div className="exam_table">
            <Loader active={isLoading} size='big'/>
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
                        icon:()=><Checkbox
                            checked={filter}
                            onChange={handleChange}
                            inputProps={{'aria-lable': 'primary checkbox'}}
                        />,
                        tooltip:"Hide/Show Filter option",
                        isFreeAction: true
                    },
                    {
                        icon:()=><Button>Edit</Button>,
                        tooltip: 'Edit Exam',
                        onClick:(e, data)=>handleClickEditExam(data)
                    }
            ]}
            />
        </div>        
    )
} 

export default ExamTable