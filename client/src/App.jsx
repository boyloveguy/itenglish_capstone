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
<<<<<<< HEAD
import LoginContainer from "./containers/LoginContainer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import ResetForgotPassword from "./components/ForgotPassword/ResetForgotPassword";
import UpdatePassword from "./components/ForgotPassword/UpdatePassword";
import MyProfile from "./components/MyProfile/MyProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import RankBoard from './components/Ranking/RankBoard';
import Role from './components/RoleScreen/Role';
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type']= 'application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;

// set header token incoming request
axios.interceptors.request.use(function(config){
   const token = localStorage.getItem("userToken");
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;
})

=======
import VideoCheck from './components/Video/VideoCheck';
import Vocabulary from './components/Vocabulary/Vocabulary';
import VocabularyDetails from './components/Vocabulary/VocabularyDetails';
import ShowVocabulary from './components/Vocabulary/ShowVocabulary';
>>>>>>> Khuyen

class App extends Component{
  render(){
    return (
      <div>   
        <Switch>
          {/* Error screen */}
          <Route exact path="/404" component={Screen404}/>
          <Route exact path="/500" component={Screen500}/>
          {/* sign-up */}
          <Route exact path="/sign-up" component={SignUpContainer}/>
          {/* home */}
          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/home" component={HomeContainer}/>
          <ProtectedRoute exact path="/exam" component={ExamContainer}/>
          <ProtectedRoute exact path="/exam-details/:exam_id" component={ExamDetails}/>
          <ProtectedRoute exact path="/add-question/:exam_id/:exam_type/:add_type/:ques_id" component={AddQuestion}/>
          <ProtectedRoute exact path="/add-from-question-pool/:exam_id/:examType" component={AddFromQuestionPool}/>
          <ProtectedRoute exact path="/exam-explain/:exam_id" component={ExamExplain}/>
          <ProtectedRoute exact path="/do-exam/:exam_id" component={DoExam}/>
          <ProtectedRoute exact path="/add-speaking/:exam_id/:exam_type/:add_type/:ques_id" component={AddSpeaking}/>
          <Route exact path="/login" component={LoginContainer}/>
          <Route  path="/password_reset/:token" component={UpdatePassword}/>
          <Route exact path="/password_reset" component={ResetForgotPassword}/>
          <ProtectedRoute exact path="/user" component={MyProfile}/>
          <ProtectedRoute exact path="/change_password" component={ChangePassword}/>
          <Route exact path="/rank-board" component={RankBoard}/>
          <ProtectedRoute exact path="/role" component={Role}/>
          {/* video */}
          <ProtectedRoute exact path="/video" component={VideoContainer}/>
          <ProtectedRoute exact path="/video-check" component={VideoCheck}/>
          {/* vocabulary */}
          <ProtectedRoute exact path="/vocabulary" component={Vocabulary}/>
          <ProtectedRoute exact path="/vocabulary-details/:voc_id" component={VocabularyDetails}/>
          <ProtectedRoute exact path="/show-vocabulary/:voc_id" component={ShowVocabulary}/>
        </Switch>          
      </div>
    );
  }  
}

export default App;
