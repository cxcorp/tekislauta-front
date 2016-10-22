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
    let currentBoard = null;

    if (boards) {
      abbreviations = boards.map(b => b.abbreviation);
      abbreviations = abbreviations.sort();

      
      const currentBoardAbbreviation = this.props.params.abbreviation;
      console.log(boards);
      currentBoard = boards.find(elem => elem.abbreviation === currentBoardAbbreviation);
    }

    return (
      <div className="App">
        <HeaderBoardList boards={abbreviations} />

        <div className="App-header">
          <h1>tekislauta</h1>
        </div>
        <div className="App-intro">
          {this.props.children && React.cloneElement(this.props.children, {
              currentBoard: currentBoard
          })}
        </div>
      </div>
    );
  }
}

export default App;
