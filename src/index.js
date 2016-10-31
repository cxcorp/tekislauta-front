import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import App from './App';
import Home from './Home';
import BoardHeader from './BoardHeader';
import BoardView from './BoardView';
import ThreadView from './ThreadView';
import './styles/index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home} />
    </Route>

    <Route component={App}>
      <Route component={BoardHeader}>
        <Route path="/boards/:board/:page" component={BoardView} />
        <Route path="/boards/:board/thread/:thread" component={ThreadView} />
      </Route>
    </Route>

    <Redirect from="/boards/:board" to="/boards/:board/0" />
    <Redirect from="*" to="/" />
  </Router>,
  document.getElementById('root')
);