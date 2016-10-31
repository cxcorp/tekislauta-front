import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Endpoints from './Endpoints';
import './styles/BoardList.css';

class BoardList extends Component {
  componentDidMount() { this.fetchBoards(); }
  componentWillReceiveProps() { this.fetchBoards(); }

  render() {
    return (
      <div className='BoardList'>
        <h2>Discussion boards</h2>
        <ul>
          {this.getContent()}
        </ul>
      </div>
    );
  }

  getContent() {
    if (!this.state || !this.state.data) {
      return (<p>Loading...</p>);
    }

    const sortedBoards = this.state.data.sort(
      (a, b) => a.abbreviation.localeCompare(b.abbreviation)
    );
    let boards = sortedBoards.map(
      board => <BoardListItem board={board} key={board.abbreviation} />
    );

    return (boards && boards.length > 0)
      ? boards
      : <p>No boards</p>;
  }

  fetchBoards() {
    Endpoints.Boards().getData()
    .then(data =>  {
      this.setState({data: data});
    })
    .catch(err => {
      console.error("BoardList::fetchBoards", "Couldn't get Boards endpoint!", err);
    })
  }
};

const BoardListItem = (props) => (
  <li className="BoardListItem"> 
    <Link to={"/boards/" + props.board.abbreviation + "/"}>
      /{props.board.abbreviation}/ - {props.board.name} {props.board.description ? ' - ' + props.board.description : ''}
    </Link>
  </li>
);

BoardListItem.propTypes = {
  board: PropTypes.shape({
    abbreviation:PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  })
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(BoardListItem.propTypes)
};

export default BoardList;