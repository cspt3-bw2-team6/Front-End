import React, { Component } from "react";
import axios from "axios";
import "nes.css/css/nes.min.css";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
      error: ""
    };
  }

  inputHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  checkReg = () => {
    if (this.state.password.length < 8) {
      this.setState({ error: "Password must be at least 8 characters" });
      return false;
    } else if (!this.state.username) {
      this.setState({ error: "Please include a username" });
      return false;
    } else if (this.state.password !== this.state.confirm) {
      this.setState({ error: "Passwords do not match" });
      return false;
    } else return true;
  };

  getEndpoint = () => {
    const baseUrl =
      process.env.REACT_APP_BASE_ENDPOINT || "http://localhost:8000";
    if (this.props.type === "register") return `${baseUrl}/rest-auth/registration/`;
    else return `${baseUrl}/rest-auth/login/`;
  };

  packUser = () => {
    if (this.props.type === "register")
      return {
        username: this.state.username,
        password1: this.state.password,
        password2: this.state.confirm
      };
    else
      return {
        username: this.state.username,
        password: this.state.password
      };
  };

  authorize = e => {
    e.preventDefault();
    this.setState({ error: "" });
    if (this.props.type === "register" && !this.checkReg()) return;
    const endpoint = this.getEndpoint();
    console.log(endpoint)
    const usr = this.packUser();
    return axios
      .post(endpoint, usr)
      .then(res => {
        localStorage.setItem("key", res.data.key);
        this.props.history.push("/game");
      })
      .catch(err => {
        this.setState({ error: err.message, showError: true });
        console.log(err);
      });
  };

  render() {
    return (
      <div className="auth-form-wrapper">
        <form onSubmit={this.authorize}>
          <div className="nes-field auth-input">
            <label htmlFor="username_field">Username</label>
            <input
              type="text"
              id="username_field"
              className="nes-input"
              placeholder="Your Username"
              name="username"
              onChange={this.inputHandler}
            />
          </div>
          <div className="nes-field auth-input">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="nes-input"
              placeholder="Your Password"
              name="password"
              onChange={this.inputHandler}
            />
          </div>
          {this.props.type === "register" && (
            <div className="nes-field auth-input">
              <label htmlFor="confirm_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_field"
                className="nes-input"
                placeholder="Confirm Password"
                name="confirm"
                onChange={this.inputHandler}
              />
            </div>
          )}
          {this.props.type === "register" ? (
            <button type="submit" className="nes-btn is-primary">
              Register Account
            </button>
          ) : (
            <button type="submit" className="nes-btn is-primary">
              Log In
            </button>
          )}
        </form>
        {this.state.error && (
          <span className="nes-text is-error">{this.state.error}</span>
        )}
      </div>
    );
  }
}

export default Form;
