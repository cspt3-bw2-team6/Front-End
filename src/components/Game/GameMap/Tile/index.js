import React from "react";
import "./Tile.css";
import { string } from "postcss-selector-parser";

const Tile = props => {
  if (props.player) {
    return <div id="player" className="map-tile"/>;
  } else if (props.exits) {
    const exits = Object.keys(props.exits).join(" ");
    const stringName = `map-tile ${exits}`;
    if (props.title === "Shop") {
      return <div className={stringName} id="shop" />;
    } else if (props.title === "Wishing Well") {
      return <div className={stringName} id="well" />;
    } else if (props.title === "Pirate Ry's") {
      return <div className={stringName} id="yarr" />;
    } else if (props.title === "Linh's Shrine") {
      return <div className={stringName} id="shrine1" />;
    } else {
      return <div className={stringName} />;
    }
  } else {
    return <div className="map-tile unknown" />;
  }
};

export default Tile;
