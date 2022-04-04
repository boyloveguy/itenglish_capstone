import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import HomeContainer from "./containers/HomeContainer";
import Screen404 from "./components/Error/Screen404";
import Screen500 from "./components/Error/Screen500";
import SignUpContainer from "./containers/SignUpContainer";
import LoginContainer from "./containers/LoginContainer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.headers.post['Content-Type']= 'application/json';
// axios.defaults.headers.post['Accept']='application/json';
// axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
   const token = localStorage.getItem("userToken");
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;
})

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/404" component={Screen404} />
          <Route exact path="/500" component={Screen500} />
          <Route exact path="/sign-up" component={SignUpContainer} />
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/home" component={HomeContainer} />
          <Route exact path="/login" component={LoginContainer} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
