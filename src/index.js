import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, DefaultRoute, browserHistory } from 'react-router';
import App from './App';
import Board from './Board';
import './styles/index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/boards/:abbreviation" component={Board} />
    </Route>
  </Router>,
  document.getElementById('root')
);
