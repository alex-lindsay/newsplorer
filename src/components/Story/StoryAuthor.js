import React from "react";
import styles from "./Story.module.css";

import Typography from "@material-ui/core/Typography";

const storyAuthor = props => {
  return (
    <div className={styles.StoryAuthor}>
      <Typography
        className={styles.author}
        color="textSecondary"
        variant="body1"
        noWrap
        data-testid="author"
      >
        {props.author}
      </Typography>
    </div>
  );
};

export default storyAuthor;
