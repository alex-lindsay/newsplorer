import React from "react";
import { shallow, mount } from "enzyme";

import SourceMenu from "../SourceMenu";

import { sampleSources } from "../../../data/sample_sources";
import { ExpansionPanelActions, MenuItem } from "@material-ui/core";

const mockSetSource = jest.fn((event) => {
  // console.log(event);
  return event;
});

describe("SourceMenu", () => {
  // it("renders with no props", () => {
  //   const wrapper = mount(<SourceMenu />);
  // });

  it("renders specifed sources", () => {
    const wrapper = mount(<SourceMenu sources={sampleSources.sources} />);
    expect(wrapper.exists("#menu-sourcemenu"));
    expect(wrapper.find("#menu-sourcemenu li")).toHaveLength(
      sampleSources.sources.length + 1
    );
    expect(wrapper.find("#menu-sourcemenu li").first().text()).toBe("None");
    expect(wrapper.exists("h6"));
    expect(wrapper.find("h6").text()).toBe("");
  });

  it("renders the selected source", () => {
    const wrapper = mount(
      <SourceMenu
        sources={sampleSources.sources}
        source={sampleSources.sources[3].id}
      />
    );
    expect(wrapper.exists("#menu-sourcemenu"));
    expect(wrapper.exists("h6"));
    expect(wrapper.find("h6").text()).toBe(sampleSources.sources[3].id);
  });

  it("sets the selected source when list item is clicked", () => {
    const wrapper = mount(
      <SourceMenu
        sources={sampleSources.sources}
        source={null}
        setSource={mockSetSource}
      />
    );
    wrapper.find("#menu-sourcemenu").first().find("li").at(4).simulate("click");
    expect(mockSetSource).toHaveBeenCalled();
    // expects 3 because li[0] is the manually added "None"
    expect(mockSetSource.mock.results[0].value).toBe(
      sampleSources.sources[3].id
    );
  });

  it("shows/hides menu when icon is clicked", () => {
    const wrapper = mount(
      <SourceMenu
        sources={sampleSources.sources}
        source={null}
        setSource={mockSetSource}
      />
    );
    const menu = wrapper.find("div#menu-sourcemenu").first();
    const menuAttributes = menu.getDOMNode().attributes;

    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");

    wrapper.find("button").first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden")).toBeNull();

    wrapper.find(MenuItem).first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");
  });
});
