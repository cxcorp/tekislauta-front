import React, { Component } from 'react';
import { Link } from 'react-router';
import Endpoints from './Endpoints';
import './styles/HeaderBoardList.css';

class HeaderBoardList extends Component {
  componentDidMount() { this.fetchBoards(); }
  componentWillReceiveProps() { this.fetchBoards(); }

  render() {
    let abbreviations = [];
    if (this.state && this.state.data) {
      abbreviations = this.state.data.map(b => b.abbreviation).sort();
    }
    const list = abbreviations.map(abbr => <HeaderBoardListItem abbr={abbr} key={abbr} />);
    return (
      <div className='HeaderBoardList'>
        <ul className='HeaderBoardList__list'>
          {list}
        </ul>
      </div>
    );
  }

  fetchBoards() {
    Endpoints.Boards().getData()
    .then(data => {
      this.setState({data: data});
    })
    .catch(err => {
      console.error("HeaderBoardList::fetchBoards", "Couldn't get Boards endpoint!", err);
    })
  }
}

const HeaderBoardListItem = ({abbr}) => (
  <li className='HeaderBoardList__list__item'>
    <Link className='HeaderBoardList__list__item__anchor' to={'/boards/' + abbr + '/'}>
      {abbr}
    </Link>
  </li>
);

export default HeaderBoardList;