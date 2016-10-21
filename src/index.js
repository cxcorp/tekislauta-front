import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, DefaultRoute, browserHistory } from 'react-router';
import App from './App';
import './styles/index.css';

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  componentDidMount() {
    // fetch initial state when the Board component is used for the first time
    this.fetchData();
  }

  componentDidUpdate(oldProps) {
    // user probably switched from a board to another board, ignore if old board === this board
    if (oldProps.params.abbreviation !== this.props.params.abbreviation)
      this.fetchData();
  }

  fetchData() {
    this.setState({
        name: 'Satunnainen',
        description: 'Tales of shit'
    });
  }

  render() {
    return (
      <div>
        <h1>
          /{this.props.params.abbreviation}/ - {this.state.name}
        </h1>
        <h2>
          {this.state.description}
        </h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/boards/:abbreviation" component={Board} />
    </Route>
  </Router>,
  document.getElementById('root')
);
