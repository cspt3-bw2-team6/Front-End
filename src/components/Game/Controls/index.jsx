import React from "react";
import Button from "./Button";
import TextInput from "./TextInput";
import "nes.css/css/nes.min.css";
import "./Controls.css";

function Controls(props) {
  console.log(props,'controls');
  return (
    <div className="controls-wrapper nes-container is-rounded">
      <div className="button-wrapper">
        {props.data.exits.indexOf("w") > -1
        ?<Button direction="w" move={props.move} />
        :<div></div>
      }
        <div className="vertical-buttons">
        {props.data.exits.indexOf("n") > -1
        ?<Button direction="n" move={props.move} />
        :<div></div>}
        {props.data.exits.indexOf("s") > -1
        ?<Button direction="s" move={props.move} />
        :<div></div>}
        </div>
        {props.data.exits.indexOf("e") > -1
        ?<Button direction="e" move={props.move} />
        :<div></div>}
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
        <button type="button" onClick={props.praying} className="nes-btn">Pray</button> 
        <button type="button" onClick={props.status} className="nes-btn">Status</button> 
      
      </div>
      
      <TextInput
        label={"Treasure"}
        activity1={"Pickup"}
        activity2={"Drop"}
        primaryFunction={props.takeit}
        secondaryFunction={props.dropit}
      />
      
      <TextInput
        activity1={"Examine"}
        activity2={"Sell"}
        primaryFunction={props.examine}
        secondaryFunction={props.sell}
        label="Item or Player Name"
      />
      
      <TextInput
        label={"Item Name"}
        activity1={"Carry"}
        activity2={"Receive"}
        primaryFunction={props.ghostCarry}
        secondaryFunction={props.ghostReceive}
      />
    </div>
  );
}

export default Controls;

