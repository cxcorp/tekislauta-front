import React from 'react';
import Header from './Header';
import './styles/App.css';

const App = (props) => (
  <div className="App">
    <Header />
    <div className="App__body">
      {props.children}
    </div>
  </div>
);

export default App;
