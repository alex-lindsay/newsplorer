import React from "react";
import styles from "./Story.module.css";
import { Typography } from "@material-ui/core";

const wikipediaTopic = (props) => {
  console.log("WIKIPEDIA TOPIC", props);
  let articles = [];
  for (let [title, { url, extract }] of Object.entries(props.topic.wikipedia)) {
    articles.push(
      <div key={title}>
        <div>{title}</div>
        <div>{url}</div>
        <div>{extract}</div>
      </div>
    );
  }
  return (
    <div className={styles.WikipediaTopic}>
      <Typography
        className={styles.title}
        variant="h5"
        noWrap
        data-testid="relatedcontenttitle"
      >
        {props.topic.url}
      </Typography>
      {articles}
    </div>
  );
};

export default wikipediaTopic;
