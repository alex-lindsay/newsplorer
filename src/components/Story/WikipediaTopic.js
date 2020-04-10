import React from "react";
import styles from "./Story.module.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";

const WikipediaTopic = (props) => {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // console.log("WIKIPEDIA TOPIC", props);
  let articles = [];
  for (let [title, { url, extract }] of Object.entries(props.topic.wikipedia)) {
    let key = encodeURI(title);
    articles.push(
      <ExpansionPanel
        square
        expanded={expanded === "panel" + key}
        onChange={handleChange("panel" + key)}
      >
        <ExpansionPanelSummary
          aria-controls={"panel" + key + "d-content"}
          id={"panel" + key + "d-header"}
        >
          <Typography className={styles.wikipediaTopicTitle}>
            {title}
            <LaunchIcon
              className={styles.titleLink}
              fontSize="small"
              onClick={() => {
                window.open(url, "_blank");
              }}
            />
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography
            className={styles.wikipediaTopicExtract}
            variant={"body1" + key}
          >
            {extract}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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

export default WikipediaTopic;
