import React, { Component } from 'react';
import { ThreadlistOriginalPost } from './Post';

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
    const abbr = board;
    fetch('/api/boards/' + abbr + '/posts/').then((data, err) => {
      if (err) {
        // TODO: ui for errors
        console.error(this.constructor.name, err);
        return;
      }

      data.json().then(jsonData => {
        console.log("ThreadList::fetchThreads", jsonData);
        if (!jsonData || jsonData.status !== 'Success') {
          throw new Error('Response was bad! ' + data);
        }
        jsonData.data.board = board;
        this.setState({ threads: jsonData.data });
      });
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