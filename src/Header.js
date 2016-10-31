import React from 'react';
import { Link } from 'react-router';
import HeaderBoardList from './HeaderBoardList';
import './styles/Header.css';

const Header = () => (
    <div className="Header">
        <HeaderBoardList />
        <h1 className="Header__text">
            <Link to="/" className="Header__text--homelink">tekislauta</Link>
        </h1>
    </div>
);

export default Header;