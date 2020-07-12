import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Board from "./components/Board";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={HomePage} />
        <Route path="/pathfinder" component={Board} />
      </BrowserRouter>
    </div>
  );
}

export default App;
