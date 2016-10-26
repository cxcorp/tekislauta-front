import React from 'react';
import { Link } from 'react-router';
import './styles/HeaderBoardList.css';

const HeaderBoardList = ({boards}) => {
  const listItems = (boards || []).map(abbr => {
    return (
      <HeaderBoardListItem abbr={abbr} key={abbr} />
    );
  });

  return (
    <div className='HeaderBoardList'>
      <ul className='HeaderBoardList__list'>
        {listItems}
      </ul>
    </div>
  );
};

const HeaderBoardListItem = ({abbr}) => (
  <li className='HeaderBoardList__list__item'>
    <Link className='HeaderBoardList__list__item__anchor' to={'/boards/' + abbr + '/'}>
      {abbr}
    </Link>
  </li>
);

export default HeaderBoardList;