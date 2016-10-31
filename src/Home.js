import React from 'react';
import BoardList from './BoardList';

const Home = props => {
    return (
        <div className='Home'>
            <p className='Home__welcome'>Welcome to tekislauta!</p>
            <BoardList />
        </div>
    );
};

export default Home;