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
    elevation: "",
    cooldown: 0,
    items: [],
    messages: [],
    players: [],
    error_msg: "",
    map: {}
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

  //Treasure functions
  take = takeit => {
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/take", { takeit })
      .then(res => {
        console.log(res);
        return this.refresh(res.data);
      })
      .catch(err => console.log(err));
  };

  drop = dropit => {
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/drop", { dropit })
      .then(res => {
        console.log(res);
        return this.refresh(res.data);
      })
      .catch(err => console.log(err));
  };

  sell = treasure => {
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/sell", { name: `${treasure}` })
      .then(res => {
        console.log(res);
        return this.refresh(res.data);
      })
      .catch(err => console.log(err));
  };

  status = checkStatus => {
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/status", { checkStatus })
      .then(res => {
        console.log(res);
        return this.refresh(res.data);
      })
      .catch(err => console.log(err));
  };

  examine = subject => {
    // subject parameter is string with name of object or player
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/examine", { name: `${subject}` })
      .then(res => {
        console.log("examine response", res.data);
        this.refresh(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  wear = item => {
    axiosWithAuth
      .axiosHeaders()
      .post("/api/adv/wear", { name: `${item}` })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  logout = () => {
    localStorage.removeItem("key");
    this.props.history.push("/");
  };

  componentDidMount() {
    axiosWithAuth
      .axiosHeaders()
      .get("/api/adv/init/")
      .then(res => {
        console.log(res);
        this.setState({
          ...res.data
        });
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
            <Controls
              takeit={this.take}
              dropit={this.drop}
              move={this.movePlayer}
              examine={this.examine}
              autoTraversal={this.autoTraversal}
            />
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
