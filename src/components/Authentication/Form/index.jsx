import React, { Component } from "react";
import "nes.css/css/nes.min.css";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playercode: ""
    };
  }

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="auth-form-wrapper">
        <form onSubmit={this.authorize}>
          <div className="nes-field auth-input">
            <label htmlFor="username_field">Player Code</label>
            <input
              type="text"
              id="username_field"
              className="nes-input"
              placeholder="Your Player Code"
              name="playercode"
              onChange={this.inputHandler}
            />
          </div>
          <button type="submit" className="nes-btn is-primary">
            Begin Play
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
