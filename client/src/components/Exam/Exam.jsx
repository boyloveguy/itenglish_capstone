import React, { Component} from 'react';
import { Container} from 'react-bootstrap';
import './Exam.css';
import MenuDiv from '../MenuDiv/MenuDiv';
import ExamTable from '../Exam/ExamTable';
import { Helmet } from 'react-helmet';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const list_input = [
    'exam_id', 
    'exam_title', 
    'exam_major', 
    'exam_author', 
    'exam_date', 
]

class Exam extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem  : 'exams and tests',
            user_id     : cookies.get('user_id'),
            user_name   : cookies.get('user_name'),
            user_role   : cookies.get('user_role')
        };  
    }

    
    render() {
        const { activeItem, value } = this.state        

        return (
            <div className="exam_div pad-top-150">
                <Helmet>
                    <title>ITEnglish | Exams and tests</title>
                </Helmet>
                <MenuDiv activeItem={this.state.activeItem}/>
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
