import React from "react";
import "./App.css";
import MainAppBar from "./containers/MainAppBar/MainAppBar";

function App() {
  return (
    <div className="App" data-testid="app">
      <MainAppBar />
      <h1>This is a test.</h1>
    </div>
  );
}

export default App;
