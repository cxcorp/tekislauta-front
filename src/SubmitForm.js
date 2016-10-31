import React, { Component } from 'react';

class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.submit(this.state);
  }

  render() {
    return (
      <div className='SubmitForm'>
        <form>
          <h3>{this.props.title}</h3>
          <label htmlFor="subject">Subject</label>
          <input placeholder="re" type="text" name="subject" onChange={this.handleChange}></input>
          <br />
          <textarea name="message" placeholder="Your message" onChange={this.handleChange}></textarea>
          <br />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default SubmitForm;
