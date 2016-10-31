import React, { Component } from 'react';
import Post, { OriginalPost } from './Post';
import ThreadSubmitForm from './ThreadSubmitForm';

class ThreadView extends Component {
    componentDidMount() { this.fetchPosts(); }

    render() {
        let posts = [];
        if (this.state && this.state.posts && this.state.posts.length >= 0) {
            posts.push(<OriginalPost data={this.state.posts[0]} key={this.state.posts[0].id} board={this.props.abbreviation} />);

            for (let i = 1; i < this.state.posts.length; i++) {
                const t = this.state.posts[i];
                posts.push(<Post data={t} key={t.id} board={this.props.abbreviation} />);
            }
        }

        return (
            <div className='Thread'>
                <ThreadSubmitForm submit={this.submitResponse.bind(this)} />
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
        fetch('/api/boards/' + this.props.params.board + '/posts/topics/' + this.props.params.thread).then(res => {
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

    submitResponse(formData) {
        // new topics go to
        // POST api/boards/:board/posts/
        // new replies go to
        // POST api/boards/:board/posts/topics/:thread
        let submitPath = `/api/boards/${this.props.params.board}/posts/topics/${this.props.params.thread}`;

        fetch(submitPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((data, err) => {
            console.log("Board::submitResponse", data);
            window.location.reload();
        })
        .catch(err => {
            console.error("BoardView::submitResponse", "Error while posting", err);
        });
    }
}

export default ThreadView;