import React from "react";
import { render, cleanup } from "@testing-library/react";
import WikipediaTopics from "../WikipediaTopics";
import { sampleStory } from "../../../data/sample_story";
import { sampleTopics } from "../../../data/sample_Topics";

it("matches expected snapshot", () => {
  const { asFragment } = render(
    <WikipediaTopics
      storyTopics={sampleStory.storyTopics}
      topics={sampleTopics}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
