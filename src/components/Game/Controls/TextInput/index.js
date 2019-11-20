import React, { useState } from "react";
import "nes.css/css/nes.min.css";
import "../Controls.css"

// basic textbox and button combo
// props include
// primaryFunction: the function you want the button to fire
// secondaryFuntion: the function you want the (optional) second button to fire
// label: sets the textbox label
// activity1: the name of the primary activity, appears on button
// activity2: the name of the secondary activity, appears on button

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
      <div className="button-group">
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
       {!!props.thirdFunction && (
        <button
          className="nes-btn"
          onClick={() => props.thirdFunction(text)}
        >
          {props.activity3}
        </button>
      )}
       {!!props.fourthFunction && (
        <button
          className="nes-btn"
          onClick={() => props.fourthFunction(text)}
        >
          {props.activity4}
        </button>
      )}
        {!!props.fifthFunction && (
        <button
          className="nes-btn"
          onClick={() => props.fifthFunction(text)}
        >
          {props.activity5}
        </button>
      )}
         {!!props.sixthFunction && (
        <button
          className="nes-btn"
          onClick={() => props.sixthFunction(text)}
        >
          {props.activity6}
        </button>
      )}
      {!!props.seventhFunction && (
        <button
          className="nes-btn"
          onClick={() => props.seventhFunction(text)}
        >
          {props.activity7}
        </button>
      )}
      </div>
    </div>
  );
}

export default TextInput;
