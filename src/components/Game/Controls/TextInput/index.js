import React, { useState } from "react";
import "nes.css/css/nes.min.css";

// basic textbox and button combo
// props include
// propFunction: the function you want the button to fire
// label: sets the textbox label
// activity: the name of the activity, appears on button

function TextInput(props) {
  const [text, setText] = useState("");

  return (
    <div className="text-action wrapper">
      <label htmlFor="name_field">{props.label}</label>
      <input
        type="text"
        id="name_field"
        className="nes-input"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="nes-btn" onClick={() => props.primaryFunction(text)}>
        {props.activity1}
      </button>
      {!!props.secondaryFunction && (
        <button
          className="nes-btn"
          onClick={() => props.secondaryFunction(text)}
        >
          {props.activity2}
        </button>
      )}
    </div>
  );
}

export default TextInput;
