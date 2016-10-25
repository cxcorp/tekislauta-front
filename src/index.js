import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Board from './Board';
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
