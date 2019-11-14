import React from "react";
import Button from "./Button";
import "nes.css/css/nes.min.css";
import "./Controls.css";

function Controls(props) {
  return (
    <div className="controls-wrapper nes-container is-rounded">
      <div className="button-wrapper">
        <Button direction="w" move={props.move} />
        <div className="vertical-buttons">
          <Button direction="n" move={props.move} />
          <Button direction="s" move={props.move} />
        </div>
        <Button direction="e" move={props.move} />
      </div>
    </div>
  );
}

export default Controls;
