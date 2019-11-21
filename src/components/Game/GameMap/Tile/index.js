import React from "react";
import "./Tile.css";

const Tile = props => {
  if (props.player) {
    return <div id="player" />;
  } else if (props.exits) {
    const exits = Object.keys(props.exits).join(" ");
    const stringName = `map-tile ${exits}`;

    return <div className={stringName} />;
  } else {
    return <div className="map-tile unknown" />;
  }
};

export default Tile;
