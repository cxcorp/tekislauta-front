import React, { Component } from 'react';
import BoardThread from './BoardThread';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // fetch initial state when the Board component is used for the first time
        this.fetchData();
    }

    componentDidUpdate(oldProps) {
        // user probably switched from a board to another board, ignore if old board === this board
        if (oldProps.params.abbreviation !== this.props.params.abbreviation)
            this.fetchData();
    }

    fetchData() {
        /*
        [
        {
        "id": 1,
        "ip": "0:0:0:0:0:0:0:1",
        "post_time": 1476803204,
        "subject": "Hello",
        "message": "Yoo wassup"
        }
        ]
        */
        if (!this.props.currentBoard) {
            console.log("Haven't finished loading boards yet, skipping fetch for this board's data");
            // app hasn't finished loading board list
            return;
        }

        fetch('/api/boards/' + this.props.currentBoard.id + '/posts/', (data, err) => {
            if (err) {
                // TODO: UI for API errors
                console.error(err);
                return;
            }
            data.json().then(data => {
                console.log("Got posts!", data);
                this.setState({threads: data});
            });
        })
        .catch(err => {
            console.error('Error while fetching posts!', err);
        });
    }

    render() {
        let name = "Loading...";
        let description = "Loading...";

        if (this.props.currentBoard) {
            name = this.props.currentBoard.name;
            description = this.props.currentBoard.description;
        }

        console.info("threads", this.state.threads);
        let threads = [];
        if (this.state.threads) {
            threads = this.state.threads.map(thread => <BoardThread data='thread' />);
        }

        return (
            <div className='Board'>
                <h1 className='Board__Header'>
                    /{this.props.params.abbreviation}/ - {name}
                </h1>

                <h2 className='Board__Description'>
                    {description}
                </h2>

                <div className='Board__Threads'>
                    {threads}
                </div>
            </div>
        );
    }
}

export default Board;