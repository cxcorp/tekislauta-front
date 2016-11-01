import React from 'react';
import BoardList from './BoardList';
import BoardCreationForm from './BoardCreationForm';
import Endpoints from './Endpoints';

const Home = props => {
    const handleSubmit = (formData) => {
        Endpoints.Boards().postData(formData, formData.auth)
        .then(data => {
            window.location.reload();
        })
        .catch(err => {
            console.error("Home::handleSubmit", err);
        });
    };
    return (
        <div className='Home'>
            <p className='Home__welcome'>Welcome to tekislauta!</p>
            <BoardList />
            <BoardCreationForm submit={handleSubmit} />
        </div>
    );
};

export default Home;