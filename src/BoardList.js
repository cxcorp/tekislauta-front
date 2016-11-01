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
        <table className='BoardList__boards'>
          <thead>
            <tr>
              <th>Board</th>
              <th>Description</th>
              <th>Latest thread</th>
            </tr>
          </thead>
          <tbody>
            {this.getBoardRows()}
          </tbody>
        </table>
      </div>
    );
  }

  getBoardRows() {
    if (!this.state || !this.state.data) {
      return [];
    }

    const sortedBoards = this.state.data.sort(
      (a, b) => a.board.abbreviation.localeCompare(b.board.abbreviation)
    );
    let boards = sortedBoards.map(
      data => <BoardListItem board={data.board} latestTopic={data.latestTopic} key={data.board.abbreviation} />
    );

    return boards;
  }

  fetchBoards() {
    Endpoints.Boards().getData()
      .then(data => {
        this.setState({ data: data });
      })
      .catch(err => {
        console.error("BoardList::fetchBoards", "Couldn't get Boards endpoint!", err);
      })
  }
};

const BoardListItem = (props) => {
  const latestPost = () => {
    if (!props.latestTopic) {
      return (<p>No threads</p>);
    }

    const getClampedMessage = msg => (msg.length > 24) ? msg.substr(0, 24 - 3) + "..." : msg;

    const subject = props.latestTopic.subject ? getClampedMessage(props.latestTopic.subject) : "No subject";
    const message = props.latestTopic.message ? getClampedMessage(props.latestTopic.message) : "No message";
    const timestamp = new Date(props.latestTopic.post_time * 1000).toLocaleString("fi-FI");
    const latestPostUrl = `/boards/${props.board.abbreviation}/${props.latestTopic.id}`;
    return (
      <p>
        <span className="BoardListItem__latestPost__subject">{subject + ' '}</span>
        <span className="BoardListItem__latestPost__message">"{message}"</span>
        <span> No. <a href={latestPostUrl}>{props.latestTopic.id}</a> </span>
        <time>{timestamp})</time>
      </p>
    );
  };
  return (
    <tr className="BoardListItem">
      <td className="BoardListItem__property">
        <Link to= {"/boards/" + props.board.abbreviation + "/"}>
          /{props.board.abbreviation}/ - {props.board.name}
        </Link>
      </td>
      <td className="BoardListItem__property">{props.board.description}</td>
      <td className="BoardListItem__property">{latestPost()}</td>
    </tr>
  )
};

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