import React, { Component } from 'react';
import { ThreadlistOriginalPost } from './Post';
import './styles/BoardThreadList.css';

class BoardThreadList extends Component {
  render() {
    let threads = [];
    if (this.props.threads) {
      threads = this.props.threads.map(thread => <ThreadlistOriginalPost data={thread} key={thread.id} board={this.props.board} />);
    }
    return (
      <div className='BoardThreadList'>
        <div className='BoardThreadList__threads'>
          {threads}
        </div>
      </div>
    );
  }
}

export default BoardThreadList;