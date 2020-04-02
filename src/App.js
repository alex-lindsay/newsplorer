import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import MainAppBar from "./containers/MainAppBar/MainAppBar";
import Headlines from "./containers/Headlines/Headlines";

import { getInitialSources } from "./store/actions";

// import styles from "./ComponentName.module.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(getInitialSources());
  }

  render() {
    return (
      <div className="App" data-testid="app">
        <MainAppBar />
        <Headlines />
      </div>
    );
  }
}

export default connect()(App);
