import React from "react";
import Tile from "./Tile";
import "./GameMap.css";


const GameMap = props => {
  const gameMap = [];
  for (let i = 0; i < 75; i++) {
    gameMap.push([]);
    for (let j = 0; j < 75; j++) {
      gameMap[i].push("?");
    }
  }
  const visitedRooms = Object.entries(props.gameMap);
  for (let [room_id, room] of visitedRooms) {
    let coordinates = room.coordinates
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map(plot => parseInt(plot));
    gameMap[74 - coordinates[1]][coordinates[0]] = {
      room_id,
      ...room
    };
    if (props.currentRoom){ 
    const currentRoom = props.currentRoom
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map(plot => parseInt(plot));
    
    gameMap[74 - currentRoom[1]][currentRoom[0]] = "X";
}
  }
  return (
    <div className="map-wrapper">
      {gameMap.map((row, index) => {
        return (
          <div className="row-wrapper">
            {row.map(room => {
              if (room === "?") {
                return <Tile key={room.room_id} />;
              } else if (room === "X") {
                return <Tile player key="player" />;
              } else {
                return <Tile exits={room.exits} key={room.room_id} title={room.title} />;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameMap;
