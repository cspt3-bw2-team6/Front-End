import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "nes.css/css/nes.min.css";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playercode: "",
      redirect: false
    };
  }

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  setRedirect = e => this.setState({ redirect: true });

  redirect = e => {
    if (this.state.redirect) {
      localStorage.setItem('playkey',this.state.playercode)
      return <Redirect to="/game" />;
    }
  };

  render() {
    return (
      <div className="auth-form-wrapper">
        <form onSubmit={this.setRedirect}>
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
          {this.redirect()}
          <button
            type="submit"
            onClick={this.setRedirect}
            className="nes-btn is-primary"
          >
            Begin Play
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
