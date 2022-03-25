// React Lib
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router, Switch, Route} from 'react-router-dom';
import history from './helpers/history';
// Css
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <App />      
      <Route path="*" component={App}/>
    </Switch>    
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
