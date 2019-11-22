import React from "react";
import Tile from "./Tile";
import "./GameMap.css";

const makeRow = (length, item) => {
  const row = Array(length).fill(item);
  return [...row];
};

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
    gameMap[coordinates[0]][coordinates[1]] = {
      room_id,
      ...room
    };
    if (props.currentRoom){ 
    const currentRoom = props.currentRoom
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map(plot => parseInt(plot));
    
    gameMap[currentRoom[0]][currentRoom[1]] = "X";
}
  }
  // for (let index in visitedRooms) {
  //   let room = visitedRooms[index];
  //   let point = room[1].coordinates
  //     .replace("(", "")
  //     .replace(")", "")
  //     .split(",");
  //   let x = parseInt(point[0]) - 1;
  //   let y = parseInt(point[1]) - 1;
  //   gameMap[x][y] = {
  //     room_id: room[0],
  //     ...room[1]
  //   };
  //   console.log(room[1].coordinates, x, y, gameMap[y][x]);
  // }

  // if (props.currentRoom) {
  //   let currentPosition = props.currentRoom
  //     .replace("(", "")
  //     .replace(")", "")
  //     .split(",");
  //   gameMap[currentPosition[1]][currentPosition[0]] = "X";
  // }
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
                return <Tile exits={room.exits} key={room.room_id} />;
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default GameMap;
