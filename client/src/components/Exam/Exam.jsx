import React, { Component} from 'react';
import { Container} from 'react-bootstrap';
import './Exam.css';
import MenuDiv from '../MenuDiv/MenuDiv';
import ExamTable from '../Exam/ExamTable';
import { Button} from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Exam extends Component {
    constructor(props) {
        super(props);

        this.handleClickAddExam = this.handleClickAddExam.bind(this);

        this.state = {
            activeItem  : 'exams and tests',
            user_id     : cookies.get('user_id'),
            user_name   : cookies.get('user_name'),
            user_role   : cookies.get('user_role')
        };  
    }

    handleClickAddExam = (e) =>{
        window.location.href = `/exam-details/${0}`
    }
     
    render() {      

        return (
            <div className="exam_div pad-top-150">
                <Helmet>
                    <title>ITEnglish | Exams and tests</title>
                </Helmet>
                <MenuDiv activeItem={this.state.activeItem}/>
                {
                    this.state.user_role == '1' || this.state.user_role == '3'? 
                    <Container style={{marginBottom: 20, textAlign: 'right'}}>
                        <Button color='primary' onClick={this.handleClickAddExam}>Add new exam</Button>
                    </Container>
                    : ''
                }                
                <Container className="div_exam">
                    <div>
                        <ExamTable/>
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
}

export default Exam
