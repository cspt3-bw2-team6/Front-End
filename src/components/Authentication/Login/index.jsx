import React from "react"
import Form from "../Form"
import "../Authentication.css"

const Login = props => {
    return (
        <div className="nes-container with-title is-centered auth-container">
            <p className="title">Please Log In</p>
            <Form history={props.history}/>
        </div>
    )
}

export default Login