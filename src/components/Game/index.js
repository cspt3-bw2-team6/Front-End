import React, { Component } from "react";
import Controls from "./Controls";
import TextBox from "./TextBox";
import Graph from "./Graph/";
import RoomInfo from "./RoomInfo";
import axiosWithAuth from "../../utilities/axiosWithAuth";
import "./Game.css";
import traverse from "../../functions/traverseRooms";

export default class Game extends Component {
  state = {
    uuid: "",
    room_id: 0,
    name: "",
    title: "",
    exits: [],
    description: "",
    coordinates: "",
    terrain: "",
    elevation:"",
    cooldown: 0,
    items: [],
    messages: [],
    players: [],
    error_msg: ""
  };

  refresh(data) {
    return this.setState({
      ...data
    });
  }

  autoTraversal() {
    traverse();
  }

  movePlayer = direction => {
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/move", { direction })
      .then(res => {
        console.log(res);
        return this.refresh(res.data);
      })
      .catch(err => console.log(err));
  };

  take = () =>{
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/take", { direction })
      .then(res => {
        console.log(res);
        return this.refresh(res.data);
      })
      .catch(err => console.log(err));

  }
  
  drop = () =>{
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/drop", { direction })
      .then(res => {
        console.log(res);
        return this.refresh(res.data);
      })
      .catch(err => console.log(err));

  }

 
  





  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  componentDidMount() {
    axiosWithAuth
      .axiosHeaders()
      .get("/api/adv/init/")
      .then(res => {
        console.log(res);
        this.setState({
          ...res.data
        })
      });
  }

  render() {
    return (
      <div className="game-wrapper">
        <div className="logout-wrapper">
          <button
            className="nes-btn"
            id="logout-button"
            type="button"
            onClick={this.logout}
          >
            <i className="nes-icon close" />
          </button>
        </div>
        <div className="player-panel">
          <div className="controls-wrapper">
            <Controls move={this.movePlayer} autoTraversal={this.autoTraversal} />
          </div>
          <div className="textbox-wrapper">
            <TextBox info={this.state} />
          </div>
        </div>
        <Graph />
        <RoomInfo {...this.state} />
      </div>
    );
  }
}
