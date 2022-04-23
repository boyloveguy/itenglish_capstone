import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import HomeContainer from './containers/HomeContainer';
import Screen404 from './components/Error/Screen404';
import Screen500 from './components/Error/Screen500';
import SignUpContainer from './containers/SignUpContainer';
import ExamContainer from './containers/ExamContainer';
import ExamDetails from './components/Exam/ExamDetails';
import AddQuestion from './components/Exam/AddQuestion';
import AddFromQuestionPool from './components/Exam/AddFromQuestionPool';
import ExamExplain from './components/Exam/ExamExplain.jsx';
import DoExam from './components/Exam/DoExam.jsx';
import AddSpeaking from './components/Exam/AddSpeaking.jsx';
import VideoContainer from './containers/VideoContainer';

class App extends Component{
  render(){
    return (
      <div>   
        <Switch>
          <Route exact path="/404" component={Screen404}/>
          <Route exact path="/500" component={Screen500}/>
          <Route exact path="/sign-up" component={SignUpContainer}/>          
          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/home" component={HomeContainer}/>
          <Route exact path="/exam" component={ExamContainer}/>
          <Route exact path="/exam-details/:exam_id" component={ExamDetails}/>
          <Route exact path="/add-question/:exam_id/:exam_type/:add_type/:ques_id" component={AddQuestion}/>
          <Route exact path="/add-from-question-pool/:exam_id/:examType" component={AddFromQuestionPool}/>
          <Route exact path="/exam-explain/:exam_id" component={ExamExplain}/>
          <Route exact path="/do-exam/:exam_id" component={DoExam}/>
          <Route exact path="/add-speaking/:exam_id/:exam_type/:add_type/:ques_id" component={AddSpeaking}/>
          <Route exact path="/video" component={VideoContainer}/>
        </Switch>          
      </div>
    );
  }  
}

export default App;
