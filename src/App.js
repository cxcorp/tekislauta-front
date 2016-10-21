import React, { Component } from 'react';
import HeaderBoardList from './HeaderBoardList.js';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.fetchBoards();
  }
  
  fetchBoards() {
    const dummy = {
      error: null,
      data: {
        boards: [
          { abbreviation: 'a', name: 'Ayy Lmaos', description: 'toppest of keks' },
          { abbreviation: 'b', name: 'Random', description: 'ayy lmao' },
          { abbreviation: 'g', name: 'Technology', description: 'Galaxy 7 = Hand grenade' },
        ]
      }
    };

    this.setState(dummy);
  }

  render() {
    const boards = this.state.data.boards;
    const abbreviations = (boards || []).map(b => b.abbreviation);

    return (
      <div className="App">
        <HeaderBoardList boards={abbreviations} />

        <div className="App-header">
          <h1>tekislauta</h1>
        </div>
        <div className="App-intro">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
