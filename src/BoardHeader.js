import React, { Component, PropTypes } from 'react';
import Endpoints from './Endpoints';
import './styles/BoardHeader.css';

class BoardHeader extends Component {
    componentDidMount() { this.fetchBoardInfo(); }
    componentWillReceiveProps() { this.fetchBoardInfo(); }

    render() {
        return (
            <div className='BoardHeader'>
                <div>
                    {this.getContent()}
                </div>
                {this.props.children}
            </div>
        );
    }

    getContent() {
        if (!this.state || !this.state.info) {
            return <p>Loading board...</p>;
        }

        return (
            <div>
                <h2>/{this.state.info.abbreviation}/ - {this.state.info.name}</h2>
                <p>{this.state.info.description}</p>
            </div>
        );
    }

    fetchBoardInfo() {
        Endpoints.Board(this.props.params.board).getData()
        .then(data => {
            this.setState({ info: data });
        })
        .catch(err => {
            console.error(
                'BoardHeader::fetchBoardInfo',
                'Error while fetching board information for board ' + this.props.params.board,
                err
            );
        });
    }
}

BoardHeader.propTypes = {
    params: PropTypes.shape({
        board: PropTypes.string.isRequired
    })
}

export default BoardHeader;