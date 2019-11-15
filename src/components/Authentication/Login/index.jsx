import React from "react";
import Form from "../Form";
import "../Authentication.css";

const Login = props => {
  return (
    <div className="nes-container with-title is-centered auth-container">
      <p className="title">Enter Player Code</p>
      <Form history={props.history} />
    </div>
  );
};

export default Login;
