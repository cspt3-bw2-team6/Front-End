import React, { useState } from "react";
import "nes.css/css/nes.min.css";

function TextInput(props) {
  const [text, setText] = useState("");

  return (
    <div className="text-action wrapper">
      <label htmlFor="name_field">Item or Player Name</label>
      <input
        type="text"
        id="name_field"
        className="nes-input"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className="nes-btn" onClick={() => props.examine(text)} >Examine</button>
    </div>
  );
}

export default TextInput;
