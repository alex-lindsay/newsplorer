import React from "react";
import "./App.css";
import MainAppBar from "./containers/MainAppBar/MainAppBar";
import Headlines from "./containers/Headlines/Headlines";

function App() {
  return (
    <div className="App" data-testid="app">
      <MainAppBar />
      <Headlines />
    </div>
  );
}

export default App;
