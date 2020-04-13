import React from "react";
import { shallow, mount } from "enzyme";

import LanguageMenu from "../LanguageMenu";

import { sampleLanguages } from "../../../data/sample_languages";
import { ExpansionPanelActions, MenuItem } from "@material-ui/core";

const mockSetLanguage = jest.fn((event) => {
  // console.log(event);
  return event;
});

describe("LanguageMenu", () => {
  it("renders with no props", () => {
    const wrapper = mount(<LanguageMenu />);
  });

  it("renders specifed languages", () => {
    const wrapper = mount(<LanguageMenu languages={sampleLanguages} />);
    expect(wrapper.exists("#menu-languagemenu"));
    expect(wrapper.find("#menu-languagemenu li")).toHaveLength(
      sampleLanguages.length + 1
    );
    expect(wrapper.find("#menu-languagemenu li").first().text()).toBe("None");
    expect(wrapper.exists(".MuiBadge-badge"));
    expect(wrapper.find(".MuiBadge-badge").text()).toBe("");
  });

  it("renders the selected language", () => {
    const wrapper = mount(
      <LanguageMenu languages={sampleLanguages} language={sampleLanguages[3]} />
    );
    expect(wrapper.exists("#menu-languagemenu"));
    expect(wrapper.exists(".MuiBadge-badge"));
    expect(wrapper.find(".MuiBadge-badge").text()).toBe(sampleLanguages[3]);
  });

  it("sets the selected language when list item is clicked", () => {
    const wrapper = mount(
      <LanguageMenu
        languages={sampleLanguages}
        language={null}
        setLanguage={mockSetLanguage}
      />
    );
    wrapper
      .find("#menu-languagemenu")
      .first()
      .find("li")
      .at(4)
      .simulate("click");
    expect(mockSetLanguage).toHaveBeenCalled();
    // expects 3 because li[0] is the manually added "None"
    expect(mockSetLanguage.mock.results[0].value).toBe(sampleLanguages[3]);
  });

  it("shows/hides menu when icon is clicked", () => {
    const wrapper = mount(
      <LanguageMenu
        languages={sampleLanguages}
        language={null}
        setLanguage={mockSetLanguage}
      />
    );
    const menu = wrapper.find("div#menu-languagemenu").first();
    const menuAttributes = menu.getDOMNode().attributes;

    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");

    wrapper.find("button").first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden")).toBeNull();

    wrapper.find(MenuItem).first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");
  });
});
