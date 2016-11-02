import React from 'react';
import { Link } from 'react-router';
import HeaderBoardList from './HeaderBoardList';
import MaintenanceMessageBanner from './MaintenanceMessageBanner';
import './styles/Header.css';

const Header = () => (
    <div className="Header">
        <MaintenanceMessageBanner date="2016-11-02">
            We have received multiple user reports of missing data.
            This is a symptom of <a target="_blank" href="https://devcenter.heroku.com/articles/sqlite3">using SQLite on Heroku</a>.
            Please accept our deepest sympathies for your loss of memes.
        </MaintenanceMessageBanner>
        <HeaderBoardList />
        <h1 className="Header__text">
            <Link to="/" className="Header__text--homelink">tekislauta</Link>
        </h1>
    </div>
);

export default Header;