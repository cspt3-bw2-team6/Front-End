import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import "nes.css/css/nes.min.css";
import "./Controls.css";

function Controls(props) {
  console.log(props);
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
      <button
        type="button"
        onClick={props.autoTraversal}
        id="automate"
        className="nes-btn"
      >
        Automate
      </button>
      <div>
        <button type="button" onClick={props.takeit} className="nes-btn" />
        <button type="button" onClick={props.dropit} className="nes-btn" />
        <button type="button" onClick={props.sellit} className="nes-btn" />
        <button type="button" onClick={props.praying} className="nes-btn" />
        <button type="button" className="nes-btn" onClick={props.examine} />
      </div>
      <TextInput
        primaryFunction={props.examine}
        label="Item or Player Name"
        activity1="Examine"
      />
      <TextInput
        label={"Item Name"}
        activity1={"Carry"}
        activity2={"Receive"}
        activity3={"Wear"}
        activity4={"Undress"}
        primaryFunction={props.ghostCarry}
        secondaryFunction={props.ghostReceive}
        tertiaryFunction={props.wear}
        quaternaryFunction={props.undress}
      />
    </div>
  );
}

export default Controls;

