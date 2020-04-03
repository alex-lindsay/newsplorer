import React, { Component } from "react";
import styles from "./Story.module.css";

import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import { Typography } from "@material-ui/core";

class Story extends Component {
  render() {
    return (
      <Slide
        direction="up"
        in={this.props.story !== null}
        mountOnEnter
        unmountOnExit
      >
        <Paper
          className={styles.Story}
          elevation={4}
          onClick={() => this.props.setStory(null)}
        >
          <Typography
            className={styles.title}
            variant="h6"
            noWrap
            data-testid="title"
          >
            {this.props.story.title}
          </Typography>
          <Typography
            className={styles.title}
            variant="body1"
            noWrap
            data-testid="title"
          >
            {this.props.story.content}
          </Typography>
        </Paper>
      </Slide>
    );
  }
}

export default Story;
