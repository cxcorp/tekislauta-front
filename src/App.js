import React, { Component } from 'react';
import HeaderBoardList from './HeaderBoardList.js';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.fetchBoards();
  }
  
  fetchBoards() {
    fetch('/api/boards/').then(response => {
      if (!response.ok) {
        console.log("Response was not ok");
        return;
      }

      response.json().then(data => {
        this.setState({ error: null, data: data });
        console.info(data);
      });
    })
    .catch(error => {
      // TODO: ui
      this.setState({ error: error, data: null });
      console.error(error);
    });
  }

  render() {
    const boards = this.state.data || [];
    let abbreviations = [];

    if (boards) {
      abbreviations = boards.map(b => b.abbreviation);
      abbreviations = abbreviations.sort();
    }

    return (
      <div className="App">
        <HeaderBoardList boards={abbreviations} />

        <div className="App__header">
          <h1 className="App__header__text">tekislauta</h1>
        </div>
        <div className="App__body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
