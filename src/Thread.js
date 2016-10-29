import React, {Component} from 'react';
import Post, { OriginalPost } from './Post';

class Thread extends Component {
    /* PARAMS: props.params.abbreviation, props.params.thread */
    constructor(props) {
        super(props);

        this.state = {
            posts: null
        };
    }
    render() {
        let posts = [];
        if (this.state.posts && this.state.posts.length >= 0) {
            posts.push(<OriginalPost data={this.state.posts[0]} key={this.state.posts[0].id} board={this.props.abbreviation} />);
            
            for (let i = 1; i < this.state.posts.length; i++) {
                const t = this.state.posts[i];
                posts.push(<Post data={t} key={t.id} board={this.props.abbreviation} />);
            }
        }

        return (
            <div className='Thread'>
                <div>
                    {posts}
                </div>
                <p>
                    {posts.length === 1 ? 'No replies' : ''}
                </p>
            </div>
        );
    }

    fetchPosts() {
        fetch('/api/boards/' + this.props.abbreviation + '/posts/topics/' + this.props.id).then(res => {
            if (!res.ok)
                console.error('Thread::fetchPosts not ok', res);
            res.json().then(res => {
                console.log("Thread::fetchPosts was ok", res.data);
                this.setState({
                    posts: res.data
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
