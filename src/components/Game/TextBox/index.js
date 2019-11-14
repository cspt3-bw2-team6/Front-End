import React from "react";
import "nes.css/css/nes.min.css"
import "./TextBox.css"

function TextBox(props) {
    return(
            <div className="nes-container with-title">
                <p className="title">{props.info.title}</p>
                <p>{props.info.description}</p>
                {props.info.error_msg && (<p>{props.info.error_msg}</p>)}
            </div>
    )
}

export default TextBox