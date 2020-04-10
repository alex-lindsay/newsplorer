import React from "react";
import styles from "./Story.module.css";

import Typography from "@material-ui/core/Typography";

const storySource = props => {
  return (
    <div className={styles.StorySource}>
      <Typography
        className={styles.source}
        color="textSecondary"
        variant="body1"
        noWrap
        data-testid="source"
      >
        {props.source.name}
      </Typography>
    </div>
  );
};

export default storySource;
