import React, { Component } from 'react';
import BoardThread from './BoardThread';
import Thread from './Thread';
import ThreadList from './ThreadList';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: {
                name: 'Loading',
                abbreviation: props.params.abbreviation,
                description: ''
            }
        };
    }

    componentDidMount() {
        // fetch initial state when the Board component is used for the first time
        this.fetchBoardInfo();
    }

    componentDidUpdate(oldProps) {
        // user probably switched from a board to another board, ignore if old board === this board
        if (oldProps.params.abbreviation !== this.props.params.abbreviation)
            this.fetchBoardInfo();
    }

    fetchBoardInfo() {
        fetch('/api/boards/' + this.props.params.abbreviation).then((data, err) => {
            if (err) {
                // TODO: UI for API errors
                console.error(this.constructor.name, err);
                return;
            }
            data.json().then(data => {
                console.log(this.constructor.name, "Got board info!", data);
                this.setState({info: data});
            });
        })
        .catch(err => {
            console.error(this.displayName, 'Error while fetching posts!', err);
        });
    }

    render() {
        let name = this.state.info.name;
        let description = this.state.info.description;

        return (
            <div className='Board'>
                <h1 className='Board__Header'>
                    /{this.props.params.abbreviation}/ - {name}
                </h1>

                <h2 className='Board__Description'>
                    {description}
                </h2>

                {this.props.params.threadId ? (
                    <Thread id={this.props.params.threadId} />
                ) : (
                    <ThreadList abbreviation={this.props.params.abbreviation} />
                )}
            </div>
        );
    }
}

export default Board;