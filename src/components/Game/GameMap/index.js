import React from "react";
import Tile from "./Tile";
import "./GameMap.css";

const GameMap = props => {
  const row = new Array(75);
  row.fill("?");
  const gameMap = new Array(75);
  gameMap.fill(row);

  // console.log("empty", gameMap);

  const visitedRooms = Object.entries(props.gameMap);

  for (let [room_id, value] of visitedRooms) {
    // console.log(key, value);
    let point = value.coordinates
      .replace("(", "")
      .replace(")", "")
      .split(",");
    let x = parseInt(point[0]);
    let y = parseInt(point[1]);
    gameMap[x - 1][y - 1] = {
      room_id,
      ...value
    };
    // console.log(gameMap[y][x])
    // gameMap[point[1]][point[0]] = {
    //   room_id: key,
    //   ...value
    // };
  }
  // console.log(gameMap);

  if (props.currentRoom) {
    let currentPosition = props.currentRoom
      .replace("(", "")
      .replace(")", "")
      .split(",");
    gameMap[currentPosition[1]][currentPosition[0]] = "X";
  }
  return (
    <div className="map-wrapper">
      {gameMap.map((row, index) => {
        console.log(row, index);
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
      )}
    </div>
  );
};

export default GameMap;
