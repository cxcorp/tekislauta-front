import React, { Component } from 'react';
import { ThreadlistOriginalPost } from './Post';
import Endpoints from './Endpoints';

class ThreadList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.fetchThreads(this.props.abbreviation);
  }

  componentWillReceiveProps(nextProps) {
    // Switching to another board...get the threads ready
    this.fetchThreads(nextProps.abbreviation);
  }

  fetchThreads(board) {
    Endpoints.Threads(board).getData()
    .then(data => {
        data.board = board; // silly reply links need this
        this.setState({ threads: data });
    })
    .catch(err => {
      console.error(this.constructor.name, 'Error while fetching threads!', err);
    });
  }

  render() {
    let threads = [];
    if (this.state.threads) {
      threads = this.state.threads.map(thread => <ThreadlistOriginalPost data={thread} key={thread.id} board={this.props.abbreviation} />);
    }
    return (
      <div className='ThreadList'>
        <div className='ThreadList__threads'>
          {threads}
        </div>
      </div>
    );
  }
}

export default ThreadList;