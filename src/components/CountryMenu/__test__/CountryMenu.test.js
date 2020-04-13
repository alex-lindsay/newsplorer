import React from "react";
import { shallow, mount } from "enzyme";

import CountryMenu from "../CountryMenu";

import { sampleCountries } from "../../../data/sample_countries";
import { ExpansionPanelActions, MenuItem } from "@material-ui/core";

const mockSetCountry = jest.fn((event) => {
  // console.log(event);
  return event;
});

describe("CountryMenu", () => {
  it("renders with no props", () => {
    const wrapper = mount(<CountryMenu />);
  });

  it("renders specifed countries", () => {
    const wrapper = mount(<CountryMenu countries={sampleCountries} />);
    expect(wrapper.exists("#menu-countrymenu"));
    expect(wrapper.find("#menu-countrymenu li")).toHaveLength(
      sampleCountries.length + 1
    );
    expect(wrapper.find("#menu-countrymenu li").first().text()).toBe("None");
    expect(wrapper.exists(".MuiBadge-badge"));
    expect(wrapper.find(".MuiBadge-badge").text()).toBe("");
  });

  it("renders the selected country", () => {
    const wrapper = mount(
      <CountryMenu countries={sampleCountries} country={sampleCountries[3]} />
    );
    expect(wrapper.exists("#menu-countrymenu"));
    expect(wrapper.exists(".MuiBadge-badge"));
    expect(wrapper.find(".MuiBadge-badge").text()).toBe(sampleCountries[3]);
  });

  it("sets the selected country when list item is clicked", () => {
    const wrapper = mount(
      <CountryMenu
        countries={sampleCountries}
        country={null}
        setCountry={mockSetCountry}
      />
    );
    wrapper
      .find("#menu-countrymenu")
      .first()
      .find("li")
      .at(4)
      .simulate("click");
    expect(mockSetCountry).toHaveBeenCalled();
    // expects 3 because li[0] is the manually added "None"
    expect(mockSetCountry.mock.results[0].value).toBe(sampleCountries[3]);
  });

  it("shows/hides menu when icon is clicked", () => {
    const wrapper = mount(
      <CountryMenu
        countries={sampleCountries}
        country={null}
        setCountry={mockSetCountry}
      />
    );
    const menu = wrapper.find("div#menu-countrymenu").first();
    const menuAttributes = menu.getDOMNode().attributes;

    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");

    wrapper.find("button").first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden")).toBeNull();

    wrapper.find(MenuItem).first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");
  });
});
