import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import './index.css';

import { Auth } from './components/Auth';
import { LeftMenu } from './components/LeftMenu';
import Cart from './components/Cart';

import store from './redux';

import { ROOT_URL } from './constants/rootUrl';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route path={`${ROOT_URL}/menu`} component={LeftMenu}/>
      <Route path={`${ROOT_URL}/index.html`} exact component={Auth}/>
      <Route path={`${ROOT_URL}/`} exact component={Auth}/>
      <Route path={`${ROOT_URL}/finish`} component={Cart}/>
    </Provider>
  </Router>,
  document.getElementById('root')
);
