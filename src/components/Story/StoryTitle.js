import React from "react";
import styles from "./Story.module.css";

import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Web";

const storyTitle = (props) => {
  return (
    <div className={styles.StoryTitle}>
      <Typography className={styles.title} variant="h4" data-testid="title">
        {props.title}
        <LaunchIcon
          fontSize="small"
          className={styles.titleLink}
          onClick={() => {
            window.open(props.url, "_blank");
          }}
        />
      </Typography>
    </div>
  );
};

export default storyTitle;
