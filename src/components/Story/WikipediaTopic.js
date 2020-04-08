import React from "react";
import styles from "./Story.module.css";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Web";

const WikipediaTopic = (props) => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  // console.log("WIKIPEDIA TOPIC", props);
  let articles = [];
  for (let [title, { url, extract }] of Object.entries(props.topic.wikipedia)) {
    articles.push(
      // <div key={title} className={styles.wikipediaTopic}>
      //   <Typography className={styles.wikipediaTopicTitle} variant="h5">
      //     {title}
      //     <LaunchIcon
      //       className={styles.titleLink}
      //       fontSize="small"
      //       onClick={() => {
      //         window.open(url, "_blank");
      //       }}
      //     />
      //   </Typography>
      //   <div className={styles.wikipediaTopicExtract}>
      //     <Typography variant="body1">{extract}</Typography>
      //   </div>
      // </div>
      <ExpansionPanel
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>
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
          <Typography variant="body1">{extract}</Typography>
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
