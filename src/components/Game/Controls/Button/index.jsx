import React from "react";
import "nes.css/css/nes.min.css";
import "./Button.css";

function Button(props) {

  const clickHandler = () => {
    props.move(props.direction);
  };

  return (
    <button
      type="button"
      className="nes-btn directional-button"
      onClick={clickHandler}
    >
      {props.direction}
    </button>
  );
}

export default Button;
