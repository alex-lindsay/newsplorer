import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import styles from "./MainAppBar.module.css";

class MainAppBar extends Component {
  render() {
    return (
      <div className={styles.grow} data-testid="main-app-bar">
        <AppBar position="static" data-testid="app-bar">
          <Toolbar data-testid="toolbar">
            <Typography
              className={styles.title}
              variant="h6"
              noWrap
              data-testid="title"
            >
              Material-UI
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default MainAppBar;
