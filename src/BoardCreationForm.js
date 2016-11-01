import React, {Component} from 'react';
import './styles/BoardCreationForm.css';

class BoardCreationForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            abbreviation: "",
            name: "",
            description: "",
            auth: {
                username: "",
                password: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        if (event.target.name === 'username') {
            this.setState({
                auth: {
                    username: event.target.value,
                    password: this.state.auth.password
                }
            });
        } else if (event.target.name === 'password') {
            this.setState({
                auth: {
                    username: this.state.auth.username,
                    password: event.target.value
                }
            });
        }
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        this.props.submit(this.state);
    }

    render() {
        return (
            <div className='BoardCreationForm'>
                <form className="BoardCreationForm__form">
                <h3 className="BoardCreationForm__form__header">Create new board</h3>
                    <fieldset className="BoardCreationForm__form__fieldset">
                        <legend>Board</legend>
                        <TextBox label="Name" inputName="name" callback={this.handleChange} />
                        <TextBox label="Abbreviation" inputName="abbreviation" callback={this.handleChange} />
                        <TextBox label="Description" inputName="description" callback={this.handleChange} />
                    </fieldset>
                    <fieldset className="BoardCreationForm__form__fieldset">
                        <legend>Authorization</legend>
                        <TextBox label="Username" inputName="username" callback={this.handleChange} />
                        <TextBox label="Password" inputName="password" callback={this.handleChange} />
                    </fieldset>
                    <button className="BoardCreationForm__form__button" type="button" onClick={this.handleSubmit}>Submit</button>
                    <input className="BoardCreationForm__form__reset" type="reset" />
                </form>
            </div>
        );
    }
}

const TextBox = (props) => (
    <label className="BoardCreationForm__form__TextBox">
        {props.label}{"\t"}
        <input name={props.inputName}
               type="text"
               onChange={props.callback}
               className="BoardCreationForm__form__TextBox__input"
               />
    </label>
);

export default BoardCreationForm;