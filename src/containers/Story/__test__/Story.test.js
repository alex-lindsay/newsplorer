import React from "react";
import { render, cleanup } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import LaunchIcon from "@material-ui/icons/Launch";

import Story from "../Story";
import StoryTitle from "../../../components/Story/StoryTitle";
import WikipediaTopic from "../../../components/Story/WikipediaTopic";

import { sampleStory } from "../../../data/sample_story";
import { sampleTopics } from "../../../data/sample_topics";

afterEach(cleanup);

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

it("opens a new window when clicking on a title link", () => {
  global.open = jest.fn();
  const wrapper = mount(<Story story={sampleStory} topics={sampleTopics} />);
  wrapper.find(StoryTitle).find(LaunchIcon).first().simulate("click");
  expect(global.open).toBeCalled();
});

it("opens a new window when clicking on a wikipedia topic link", () => {
  global.open = jest.fn();
  const wrapper = mount(<Story story={sampleStory} topics={sampleTopics} />);
  wrapper
    .find(WikipediaTopic)
    .first()
    .find(LaunchIcon)
    .first()
    .simulate("click");
  expect(global.open).toBeCalled();
});

it("TODO - check this test - expands wikipedia topic when clicked", () => {
  global.open = jest.fn();
  const wrapper = mount(<Story story={sampleStory} topics={sampleTopics} />);
  const firstWikipediaTopic = wrapper
    .find(".MuiExpansionPanelSummary-root")
    .first();
  const secondWikipediaTopic = wrapper
    .find(".MuiExpansionPanelSummary-root")
    .at(2);
  firstWikipediaTopic.simulate("click");
  expect(wrapper).toMatchSnapshot();
  secondWikipediaTopic.simulate("click");
  expect(wrapper).toMatchSnapshot();
});
