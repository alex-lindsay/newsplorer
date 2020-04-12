import React from "react";
import { render, cleanup } from "@testing-library/react";
import Story from "../Story";
import { sampleStory } from "../../../data/sample_story";
import { sampleTopics } from "../../../data/sample_topics";

afterEach(cleanup);

// story={this.props.story}
// topics={this.props.topics}
// setStory={this.props.setStory}

// console.log(sampleStory);

it("renders Story without crashing", () => {
  const { getByTestId } = render(
    <Story story={sampleStory} topics={sampleTopics} />
  );
  expect(getByTestId("story")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(
    <Story story={sampleStory} topics={sampleTopics} />
  );
  expect(asFragment()).toMatchSnapshot();
});
