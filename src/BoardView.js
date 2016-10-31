import React, {Component} from 'react';
import ThreadList from './ThreadList';
import ThreadSubmitForm from './ThreadSubmitForm';
import './styles/BoardView.css';

class BoardView extends Component {
    render() {
        return (
            <div className="BoardView">
                <ThreadSubmitForm submit={this.submitResponse.bind(this) } />
                <ThreadList abbreviation={this.props.params.board}/>
            </div>
        );
    }

    submitResponse(formData) {
    // new topics go to
    // POST api/boards/:board/posts/
    let submitPath = `/api/boards/${this.props.params.board}/posts/`;
    
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

export default BoardView;