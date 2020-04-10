import React from "react";
import { parseISO, format } from "date-fns";

import styles from "./Story.module.css";

import Typography from "@material-ui/core/Typography";

const storyPublishedDate = props => {
  return (
    <div className={styles.StoryPublishedDate}>
      <Typography
        className={styles.publishedAt}
        color="textSecondary"
        variant="body1"
        noWrap
        data-testid="publishedat"
      >
        {format(parseISO(props.publishedAt), "LLL d h:mmaaaaa")}
      </Typography>
    </div>
  );
};

export default storyPublishedDate;
