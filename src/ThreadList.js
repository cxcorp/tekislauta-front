import React, {Component} from 'react';
import BoardThread from './BoardThread';

class ThreadList extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.fetchThreads();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.abbreviation !== this.props.abbreviation) {
            this.fetchThreads();
        }
    }

    fetchThreads() {
        const abbr = this.props.abbreviation;
        fetch('/api/boards/' + abbr + '/posts/').then((data, err) => {
            if (err) {
                // TODO: ui for errors
                console.error(this.constructor.name, err);
                return;
            }

            data.json().then(data => {
                console.log("ThreadList", "Got data", data);
                this.setState({threads: data});
            });
        })
        .catch(err => {
            console.error(this.constructor.name, 'Error while fetching threads!', err);
        });
    }

    render() {
        console.info(this.constructor.name, "threads", this.state.threads);
        let threads = [];
        if (this.state.threads) {
            threads = this.state.threads.map(thread => <BoardThread data={thread} key={thread.id}/>);
        }
        return (
            <div className='ThreadList'>
                {threads}
            </div>
        );
    }
}

export default ThreadList;