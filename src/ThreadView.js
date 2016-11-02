import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Post, { OriginalPost } from './Post';
import SubmitForm from './SubmitForm';
import Endpoints from './Endpoints';
var self;

class ThreadView extends Component {
    constructor(props) {
        super(props);
        
        this.state = { title: "Loading..." };
    }
    
    componentDidMount() { this.fetchPosts(); }

    render() {
        self = this;
        let posts = [];
        if (this.state && this.state.posts && this.state.posts.length >= 0) {
            posts.push(<OriginalPost data={this.state.posts[0]} key={this.state.posts[0].id} board={this.props.params.board} onReplyClicked={d => this.handleReplyClick(d)} />);

            for (let i = 1; i < this.state.posts.length; i++) {
                const t = this.state.posts[i];
                posts.push(<Post data={t} key={t.id} board={this.props.abbreviation} onReplyClicked={d => this.handleReplyClick(d)} />);
            }
        }

        return (
            <div className='Thread'>
                <Helmet title={this.state.title}/>
                <div className='SubmitFormBox'>
                    <SubmitForm title="Submit new reply" submit={this.submitResponse.bind(this)} callback={inst => self.submitForm = inst} />
                </div>
                <div>
                    {posts}
                </div>
                <p>
                    {posts.length === 1 ? 'No replies' : ''}
                </p>
            </div>
        );
    }

    handleReplyClick(postId) {
        self.submitForm.setMessageBoxVal('>> ' + postId);
    }

    fetchPosts() {
        Endpoints.Replies(this.props.params.board, this.props.params.thread).getData()
        .then(data => {
            const opMsg = data[0].message;
            const truncatedMsg = opMsg.length > 32 ? opMsg.substr(0, 32-3) + "..." : opMsg;
            this.setState({
                posts: data,
                title: `/${this.props.params.board}/ - ${truncatedMsg}`
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