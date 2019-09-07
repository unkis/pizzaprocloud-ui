import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import './index.css';

import { Auth } from './components/Auth';
import { LeftMenu } from './components/LeftMenu';

import store from './redux';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path="/menu" component={LeftMenu}/>
      <Route path="/" exact component={Auth}/>
      <Route path="/finish" render={() => <div>DONE</div>}/>
    </Provider>
  </Router>,
  document.getElementById('root')
);
