import React from "react";
import Form from "../Form";
import "../Authentication.css";

const Register = props => {
  return (
    <div className="nes-container with-title is-centered auth-container">
      <p className="title">Please Create Your Account</p>
      <Form type="register" history={props.history} />
    </div>
  );
};

export default Register;
