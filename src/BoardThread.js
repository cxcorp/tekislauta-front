import React, {Component} from 'react';


class BoardThread extends Component {
    render() {
        return (
            <div className='BoardThread'>
                <h5>{this.props.data.subject}</h5>
                <br/>
                <time>{new Date(this.props.data.post_time*1000).toString()}</time>
                <br/>
                <p>{this.props.data.message}</p>
            </div>
        );
    }
}

export default BoardThread;