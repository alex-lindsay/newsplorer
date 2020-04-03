import React, { Component } from "react";
import styles from "./Story.module.css";

import Paper from "@material-ui/core/Paper";
import Slide from "@material-ui/core/Slide";
import CancelIcon from "@material-ui/icons/Cancel";

import StorySource from "../../components/Story/StorySource";
import StoryAuthor from "../../components/Story/StoryAuthor";
import StoryTitle from "../../components/Story/StoryTitle";
import StoryImage from "../../components/Story/StoryImage";
import StoryContent from "../../components/Story/StoryContent";
import StoryPublishedDate from "../../components/Story/StoryPublishedDate";

class Story extends Component {
  render() {
    return (
      <Slide
        direction="up"
        in={this.props.story !== null}
        mountOnEnter
        unmountOnExit
      >
        <Paper className={styles.Story} elevation={4}>
          <div className={styles.storyCancel}>
            <CancelIcon onClick={() => this.props.setStory(null)} />
          </div>
          <StoryTitle
            title={this.props.story.title}
            url={this.props.story.url}
          />
          <div className={styles.StoryHolder}>
            <div className={styles.StoryDetail}>
              <div className={styles.StoryByLine}>
                <StorySource source={this.props.story.source} />
                <StoryAuthor author={this.props.story.author} />
                <StoryPublishedDate
                  publishedAt={this.props.story.publishedAt}
                />
              </div>
              <StoryImage
                imageUrl={this.props.story.urlToImage}
                description={this.props.story.description}
              />
              <StoryContent content={this.props.story.content} />
            </div>
            <div className={styles.RelatedContent}>RelatedContent</div>
          </div>
        </Paper>
      </Slide>
    );
  }
}

export default Story;
