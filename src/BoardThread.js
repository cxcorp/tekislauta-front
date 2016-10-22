import React, {Component} from 'react';

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