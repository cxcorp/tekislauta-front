import React, { Component } from 'react';
import Post, { OriginalPost } from './Post';
import SubmitForm from './SubmitForm';
import Endpoints from './Endpoints';

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
                <SubmitForm title="Submit new reply" submit={this.submitResponse.bind(this)} />
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
        Endpoints.Replies(this.props.params.board, this.props.params.thread).getData()
        .then(data => {
            console.log("Thread::fetchPosts was ok", data);
            this.setState({
                posts: data
            });
        })
        .catch(err => console.error("ThreadView::fetchPots", "Error while getting posts!", err));
    }

    submitResponse(formData) {
        Endpoints.Replies(this.props.params.board, this.props.params.thread).postData(formData)
        .then(data => {
            console.log("ThreadView::submitResponse", "Submitted new post!", data);
            window.location.reload();
        })
        .catch(err => {
            console.log("ThreadView::submitResponse", "Error while submitting new post!", err);
        });
    }
}

export default ThreadView;