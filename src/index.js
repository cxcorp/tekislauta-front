import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, DefaultRoute, browserHistory } from 'react-router';
import App from './App';
import Board from './Board';
import Thread from './Thread';
import ThreadList from './ThreadList';
import './styles/index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="boards/:abbreviation/" component={Board}>
        {/*<Route path="boards/:abbreviation/" component={ThreadList} />*/}
        <Route path=":thread/" />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
