import React, { Component } from "react";
import Controls from "./Controls";
import TextBox from "./TextBox";
import config from "../../config";
import "./Game.css";

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
      uuid: data.uuid,
      name: data.name,
      title: data.title,
      description: data.description,
      players: data.players,
      error_msg: data.error_msg
    });
  }

  movePlayer = direction => {
    config
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
    config
      .axiosHeaders()
      .get("/api/adv/init/")
      .then(res => this.refresh(res.data))
      .catch(err => console.log(err));
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
            <i class="nes-icon close" />
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
      </div>
    );
  }
}
