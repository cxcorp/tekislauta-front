import React, { Component } from 'react';
import Thread from './Thread';
import ThreadList from './ThreadList';
import ThreadSubmitForm from './ThreadSubmitForm';
import './styles/Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {
        name: 'Loading',
        abbreviation: props.params.abbreviation,
        description: ''
      }
    };
  }

  componentDidMount() {
    // fetch initial state when the Board component is used for the first time
    this.fetchBoardInfo();
  }

  componentDidUpdate(oldProps) {
    // user probably switched from a board to another board, ignore if old board === this board
    if (oldProps.params.abbreviation !== this.props.params.abbreviation)
      this.fetchBoardInfo();
  }

  fetchBoardInfo() {
    fetch('/api/boards/' + this.props.params.abbreviation).then((data, err) => {
      if (err) {
        // TODO: UI for API errors
        console.error(this.constructor.name, err);
        return;
      }
      data.json().then(jsonData => {
        console.log("Board::fetchBoardInfo", "Got board info!", jsonData);
        if (!jsonData || jsonData.status !== 'Success') {
          throw new Error('Parsed data was bad! ' + data);
        }
        this.setState({ info: jsonData.data });
      });
    })
      .catch(err => {
        console.error("Board::fetchBoardInfo", 'Error while fetching posts!', err);
      });
  }

  getChildToShow() {
    // yes, I know what the ?: is but this is more readable
    if (this.props.params.threadId) {
      // we are in the `/boards/b/:threadId` path
      return (<Thread abbreviation={this.props.params.abbreviation} id={this.props.params.threadId} />);
    } else {
      // we are in the `boards/b/` path
      return (<ThreadList abbreviation={this.props.params.abbreviation} />);
    }
  }

  submitResponse(formData) {
    // new topics go to
    // POST api/boards/:board/posts/
    let submitPath = `/api/boards/${this.props.params.abbreviation}/posts/`;
    if (this.props.params.threadId) {
      // we're in a thread view so we're actually replying to an existing topic
      // POST api/boards:board/posts/topics/:topic
      submitPath += `topics/${this.props.params.threadId}`;
    }
    
    fetch(submitPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((data, err) => {
        console.log("Board::submitResponse", data);
        window.location.reload();
      });
  }

  render() {
    console.log("Board props", this.props);
    let name = this.state.info.name;
    let description = this.state.info.description;

    let childToShow = this.getChildToShow();

    return (
      <div className='Board'>
        <h1 className='Board__header'>
          /{this.props.params.abbreviation}/ - {name}
        </h1>

        <h2 className='Board__description'>
          {description}
        </h2>

        <ThreadSubmitForm submit={this.submitResponse.bind(this) } />
        {childToShow}
      </div>
    );
  }
}

export default Board;
