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
          <Route exact path="/add-question/:exam_id" component={AddQuestion}/>
          <Route exact path="/add-from-question-pool/:exam_id" component={AddFromQuestionPool}/>
        </Switch>          
      </div>
    );
  }  
}

export default App;
