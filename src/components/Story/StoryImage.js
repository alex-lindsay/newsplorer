import React from "react";
import styles from "./Story.module.css";

const storyImage = (props) => {
  return (
    <div className={styles.StoryImage}>
      <img src={props.imageUrl} alt={props.description} />
    </div>
  );
};

export default storyImage;
