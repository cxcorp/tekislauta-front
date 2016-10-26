import React, { Component } from 'react';
import { Link } from 'react-router';
import './styles/BoardList.css';

class BoardList extends Component {
  render() {
    const sortedBoards = this.props.boards.sort((a, b) => a.abbreviation.localeCompare(b.abbreviation));
    let boards = sortedBoards.map(board =>
      <BoardListItem value={board.name} abbreviation={board.abbreviation} key={board.abbreviation} />
    );
    return (
      <div className='BoardList'>
        <h2>Boards</h2>
        <ul>
          {boards}
        </ul>
      </div>
    );
  }
}

class BoardListItem extends Component {
  render() {
    return (
      <li className='BoardListItem'>
        <Link to={"/boards/" + this.props.abbreviation + "/"}>
          /{this.props.abbreviation}/ - {this.props.value}
        </Link>
      </li>
    );
  }
}

export default BoardList;