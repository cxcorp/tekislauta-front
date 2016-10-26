import React, {Component} from 'react';
import Post from './Post';

class Thread extends Component {
    /* PARAMS: props.params.abbreviation, props.params.thread */
    constructor(props) {
        super(props);

        this.state = {
            threads: null
        };
    }
    render() {
        let threads = [];
        if (this.state.threads) {
            threads = this.state.threads.map(thread => <Post data={thread} key={thread.id} board={this.props.abbreviation}/>);
        }
        return (
            <div className='Thread'>
                <p>
                    {threads}
                </p>
            </div>
        );
    }

    fetchPosts() {
        fetch('/api/boards/' + this.props.abbreviation + '/posts/' + this.props.id).then(res => {
            if (!res.ok)
                console.log('Therad::fetchPosts', res);
            res.json().then(res => {
                this.setState({
                    threads: res.data
                });
            }).catch(e => {
                console.log(e);
            });
        });
    }

    componentDidMount() {
        this.fetchPosts();
    }
}

export default Thread;