import React from "react";
import "nes.css/css/nes.min.css";
import "./Button.css";

function Button(props) {
  const dir = {
    w: "&#11207",
    e: "&#11208",
    n: "&#11205",
    s: "&#11206"
  };

  const clickHandler = () => {
    props.move(props.direction);
  };

  const setDirection = () => {
    return { __html: dir[props.direction] };
  };
  return (
    <button
      type="button"
      className="nes-btn directional-button"
      dangerouslySetInnerHTML={setDirection()}
      onClick={clickHandler}
    />
  );
}

export default Button;
