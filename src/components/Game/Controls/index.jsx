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
   
      <div className="top-buttons">
       
      <button
        room={props}
        type="button"
        onClick={props.autoTraversal}
        id="automate"
        className="nes-btn"
      >
        Automate
      </button>
        
        <button type="button" onClick={props.praying} className="nes-btn" >Pray</button>
        
        <button type="button" onClick={props.status} className="nes-btn">Status</button> 
        <button type="button" onClick={props.mine} className="nes-btn">Mine</button> 
      </div>
      
      {/* <TextInput
        label={"Treasure"}
        activity1={"Pickup"}
        activity2={"Drop"}
        primaryFunction={props.takeit}
        secondaryFunction={props.dropit}
      /> */}
      
      <TextInput
        activity1={"Examine"}
        activity2={"Change Name"}
        activity3={"Sell"}
        activity4={"Pickup"}
        activity5={"Drop"}
        activity6={"Carry"}
        activity7={"Receive"}
        primaryFunction={props.examine}
        secondaryFunction={props.changeName}
        thirdFunction={props.sellit}
        fourthFunction={props.takeit}
        fifthFunction={props.takeit}
        sixthFunction={props.ghostCarry}
        seventhFunction={props.ghostReceive}
        label="Item or Player Name"
      />
      
      {/* <TextInput
        label={"Item Name"}
        activity1={"Carry"}
        activity2={"Receive"}
        // activity3={"Wear"}
        // activity4={"Undress"}
        primaryFunction={props.ghostCarry}
        secondaryFunction={props.ghostReceive}
        // tertiaryFunction={props.wear}
        // quaternaryFunction={props.undress}
      /> */}
    </div>
  );
}

export default Controls;

