import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import WikipediaTopics from "../WikipediaTopics/WikipediaTopics";

import styles from "./RelatedContent.module.css";

class RelatedContent extends Component {
  render() {
    return (
      <div className={styles.RelatedContent}>
        <Typography
          className={styles.title}
          variant="h5"
          noWrap
          data-testid="relatedcontenttitle"
        >
          Related Content
        </Typography>
        <WikipediaTopics
          storyTopics={this.props.storyTopics}
          topics={this.props.topics}
        />
      </div>
    );
  }
}

export default RelatedContent;
