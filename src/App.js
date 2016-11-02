import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import './styles/App.css';

const App = (props) => (
  <div className="App">
    <Header />
    <div className="App__body">
      <Helmet title="Home" titleTemplate="%s - tekislauta"/>
      {props.children}
    </div>
  </div>
);

export default App;
