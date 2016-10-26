import React, { Component } from 'react';
import { Link } from 'react-router';
import HeaderBoardList from './HeaderBoardList.js';
import BoardList from './BoardList';
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

      response.json().then(responseData => {
        if (responseData.status === 'Success') {
          this.setState({ error: null, data: responseData.data });
        } else {
          this.setState({ error: responseData.status, data: null });
        }
      });
    })
      .catch(error => {
        // TODO: ui
        this.setState({ error: error, data: null });
        console.error(error);
      });
  }

  showBoardListOrNot() {
    return this.props.location.pathname === '/'
      && this.state.data;
  }

  render() {
    let abbreviations = [];
    console.log("App::render boards data", this.state.data);
    if (this.state.data) {
      abbreviations = this.state.data.map(b => b.abbreviation);
      abbreviations = abbreviations.sort();
    }
    if (this.state.error) {
      console.error("App::render", this.state.error);
    }

    return (
      <div className="App">
        <HeaderBoardList boards={abbreviations} />

        <div className="App__header">
          <h1 className="App__header__text">
            <Link to="/" className="App__header__text--homelink">tekislauta</Link>
          </h1>
        </div>
        <div className="App__body">
          {this.showBoardListOrNot() ? <BoardList boards={this.state.data} /> : null}
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
