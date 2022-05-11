import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { Checkbox} from '@material-ui/core';
import { Button, Loader} from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import './Exam.css';

const columns = [
    {field: 'exam_id'       , title: 'ID'       , width: 80},
    {field: 'exam_name'     , title: 'Title'    , width: 300},
    {field: 'major_name'    , title: 'Major'    , width: 150},
    {field: 'type_exam'     , title: 'Kind'     , width: 100},
    {field: 'submit_times'  , title: 'Submit'   , width: 120},
    {field: 'user_name'     , title: 'Author'   , width: 120},
    {field: 'cre_date'      , title: 'Date'     , width: 150, type: 'date'},
    {field: 'type_id'       , hidden: true}
]

const cookies = new Cookies();

const ExamTable = (props) =>{  
    const [filter, setFilter]       = useState(false);
    const [isLoading, setLoading]   = useState(true);
    const [tableData, setTableData] = useState([]);
    const user_role                 = cookies.get('user_role')
    const url = "http://localhost:8000/api/exam";
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

    const handleClickDoExam=(data)=>{
        try {
            window.location.href = `/exam-explain/${data.exam_id}`
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
                onRowClick={(event, rowData) => handleClickDoExam(rowData)}
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
                    (user_role !== '2' ?
                    // user_role == '1' && 
                    {
                        icon:()=><Button color='primary'>Edit</Button>,
                        tooltip: 'Edit Exam',
                        onClick:(e, data)=>handleClickEditExam(data)
                    } : '')
            ]}
            />
        </div>        
    )
} 

export default ExamTable