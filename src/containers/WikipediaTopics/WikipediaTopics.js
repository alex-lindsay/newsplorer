import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import WikipediaTopic from "../../components/Story/WikipediaTopic";

import styles from "./WikipediaTopics.module.css";

class WikipediaTopics extends Component {
  render() {
    let storyTopics = [...new Set(this.props.storyTopics)].sort();
    //TODO filter this to remove extraneous topics?

    let wikipediaTopics = storyTopics.map((storyTopic) =>
      this.props.topics[storyTopic.toLowerCase()] ? (
        <WikipediaTopic
          key={storyTopic}
          storyTopic={storyTopic}
          topic={this.props.topics[storyTopic.toLowerCase()]}
        />
      ) : null
    );
    return (
      <div className={styles.WikipediaTopics}>
        <Typography
          className={styles.title}
          variant="h6"
          noWrap
          data-testid="wikipediatopics"
        >
          Wikipedia Topics
        </Typography>
        <div className={styles.scroller}>{wikipediaTopics}</div>
      </div>
    );
  }
}

export default WikipediaTopics;
