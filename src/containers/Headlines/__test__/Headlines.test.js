import React from "react";
import { cloneDeep } from "lodash";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";

import { render, cleanup } from "@testing-library/react";
import { mount } from "enzyme";
import Headlines from "../Headlines";

import { sampleHeadlines } from "../../../data/sample_headlines";

const setStory = jest.fn((story) => story);

afterEach(cleanup);

it("renders App without crashing", () => {
  const { getByTestId } = render(
    <Headlines headlines={sampleHeadlines.articles} setStory={setStory} />
  );
  expect(getByTestId("headlines")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(
    <Headlines headlines={sampleHeadlines.articles} setStory={setStory} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("renders a table if there are headlines passed in", () => {
  const wrapper = mount(
    <Headlines headlines={sampleHeadlines.articles} setStory={setStory} />
  );
  expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(
    sampleHeadlines.articles.length
  );
});

it("does not render a table if there are not headlines passed in", () => {
  const wrapper = mount(<Headlines setStory={setStory} />);
  expect(wrapper.find(TableBody).find(TableRow)).toHaveLength(0);
});

it("calls a function with the proper story index when clicking on the DescriptionIcon", () => {
  const wrapper = mount(
    <Headlines headlines={sampleHeadlines.articles} setStory={setStory} />
  );
  wrapper
    .find(TableBody)
    .find(TableRow)
    .find(IconButton)
    .forEach((button) => {
      button.simulate("click");
    });
  expect(setStory).toHaveBeenCalledTimes(sampleHeadlines.articles.length);
});

it("does not render an image if there is no imageURL on the headline", () => {
  let sampleArticles = cloneDeep(sampleHeadlines.articles);
  delete sampleArticles[0].urlToImage;
  const wrapper = mount(
    <Headlines headlines={sampleArticles} setStory={setStory} />
  );
  expect(
    wrapper.find(TableBody).find(TableRow).first().find("img")
  ).toHaveLength(0);
});
