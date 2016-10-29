import React, { Component } from 'react';
import { Link } from 'react-router';
import Utilities from './Utilities';
import './styles/Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.containerClassName = 'Post Post--reply';
  }

  getIdColor() {
    const ip = this.props.data.ip;
    let r = parseInt(ip.substr(0, 2), 16);
    let g = parseInt(ip.substr(2, 2), 16);
    let b = parseInt(ip.substr(4, 2), 16);
    const modifier = parseInt(ip.substr(6, 2), 16);
    // the ip has 4 bytes, we only need 3. We could use the last one for alpha but that's trash
    // instead, we'll just xor
    r ^= modifier;
    g ^= modifier;
    b ^= modifier;
    let hsl = Utilities.RgbToHsl(r, g, b);
    hsl['s'] -= 20; // desaturate a little for that web 3.0 look
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  render() {
    const idStyle = {
      backgroundColor: this.getIdColor()
    }

    return (
      <div className={this.containerClassName} id={'p' + this.props.data.id}>
        <div className='Post__header'>
          <span className='Post__header__title'>
            <Link className='Post__header__title__anchor' to={'/boards/' + this.props.board + '/' + this.props.data.id}>
              {this.props.data.subject}
            </Link>
          </span>
          <span className='Post__header__posterName'> Anonymous </span>
          <span className='Post__header__id'>(ID: <span className='Post__header__id__value' style={idStyle}>{this.props.data.ip}</span>) </span>
          <time className='Post__header__timestamp'>{new Date(this.props.data.post_time * 1000).toLocaleString("fi-FI") }</time>
          <span className='Post__header__postNumber'>  No.{this.props.data.id}</span>
          <ReplyLink board={this.props.board} postId={this.props.data.id} />
        </div>
        <div className='Post__content'>
          <p>{this.props.data.message}</p>
        </div>
      </div>
    );
  }
}

class ReplyLink extends Component {
  render() {
    const link = `/boards/${this.props.board}/${this.props.postId}`;
    return (
      <span className='ReplyLink'>
        [<Link to={link}>Reply</Link>]
      </span>
    );
  }
}

class OriginalPost extends Post { // thread starter
  constructor(props) {
    super(props);
    this.containerClassName = 'Post Post--op';
  }
}

class ThreadlistOriginalPost extends OriginalPost {
  constructor(props) {
    super(props);
    this.containerClassName = 'Post Post--op Post--op_threadlist';
  }
}

export { Post as default, OriginalPost, ThreadlistOriginalPost };