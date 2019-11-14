import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Game from "./components/Game";
import Register from "./components/Authentication/Register";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/game" component={Game} />
    </div>
  );
}

export default App;
