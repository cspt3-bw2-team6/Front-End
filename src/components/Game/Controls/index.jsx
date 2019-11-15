import React from "react";
import Button from "./Button";
import "nes.css/css/nes.min.css";
import "./Controls.css";


function Controls(props) {
  console.log(props)
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
      <button type="button" onClick={props.autoTraversal} id="automate" className="nes-btn">Automate</button>
    <div>
    <Button action="n" move={props.move} />
    <Button action="s" move={props.move} />
    <Button direction="n" move={props.move} />
    <Button direction="s" move={props.move} />
    </div>
    </div>
  );
}

export default Controls;
