import React, { Component } from "react";
import Controls from "./Controls";
import TextBox from "./TextBox";
import Graph from "./Graph/"
import axiosWithAuth from "../../utilities/axiosWithAuth";
import "./Game.css";
import "../../../functions/traverseRooms";

export default class Game extends Component {
  state = {
    uuid: "",
    name: "",
    title: "",
    description: "",
    players: [],
    error_msg: ""
  };

  refresh(data) {
    return this.setState({
      title: data.title,
      description: data.description,
      players: data.players,
      errors: data.errors
    });
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
          title: res.data.title,
          description: res.data.description,
          players: res.data.players,
          errors: res.data.errors
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
            <Controls move={this.movePlayer} />
          </div>
          <div className="textbox-wrapper">
            <TextBox info={this.state} />
          </div>
        </div>
        <Graph />
      </div>
    );
  }
}
