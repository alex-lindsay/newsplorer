import React from "react";
import styles from "./Story.module.css";

import Typography from "@material-ui/core/Typography";

const storyContent = props => {
  return (
    <div className={styles.StoryContent}>
      <Typography
        className={styles.content}
        variant="body1"
        data-testid="content"
      >
        {props.content}
      </Typography>
    </div>
  );
};

export default storyContent;
