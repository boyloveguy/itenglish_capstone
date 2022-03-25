import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import HomeContainer from './containers/HomeContainer';
import Screen404 from './components/Error/Screen404';
import Screen500 from './components/Error/Screen500';
import SignUpContainer from './containers/SignUpContainer';

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
        </Switch>          
      </div>
    );
  }  
}

export default App;
