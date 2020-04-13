import React from "react";
import { shallow, mount } from "enzyme";

import CategoryMenu from "../CategoryMenu";

import { sampleCategories } from "../../../data/sample_categories";
import { ExpansionPanelActions, MenuItem } from "@material-ui/core";

const mockSetCategory = jest.fn((event) => {
  // console.log(event);
  return event;
});

describe("CategoryMenu", () => {
  it("renders with no props", () => {
    const wrapper = mount(<CategoryMenu />);
  });

  it("renders specifed categories", () => {
    const wrapper = mount(<CategoryMenu categories={sampleCategories} />);
    expect(wrapper.exists("#menu-categorymenu"));
    expect(wrapper.find("#menu-categorymenu li")).toHaveLength(
      sampleCategories.length + 1
    );
    expect(wrapper.find("#menu-categorymenu li").first().text()).toBe("None");
    expect(wrapper.exists(".MuiBadge-badge"));
    expect(wrapper.find(".MuiBadge-badge").text()).toBe("");
  });

  it("renders the selected category", () => {
    const wrapper = mount(
      <CategoryMenu
        categories={sampleCategories}
        category={sampleCategories[3]}
      />
    );
    expect(wrapper.exists("#menu-categorymenu"));
    expect(wrapper.exists(".MuiBadge-badge"));
    expect(wrapper.find(".MuiBadge-badge").text()).toBe(
      sampleCategories[3].substring(0, 3) + "…"
    );
  });

  it("sets the selected category when list item is clicked", () => {
    const wrapper = mount(
      <CategoryMenu
        categories={sampleCategories}
        category={null}
        setCategory={mockSetCategory}
      />
    );
    wrapper
      .find("#menu-categorymenu")
      .first()
      .find("li")
      .at(4)
      .simulate("click");
    expect(mockSetCategory).toHaveBeenCalled();
    // expects 3 because li[0] is the manually added "None"
    expect(mockSetCategory.mock.results[0].value).toBe(sampleCategories[3]);
  });

  it("shows/hides menu when icon is clicked", () => {
    const wrapper = mount(
      <CategoryMenu
        categories={sampleCategories}
        category={null}
        setCategory={mockSetCategory}
      />
    );
    const menu = wrapper.find("div#menu-categorymenu").first();
    const menuAttributes = menu.getDOMNode().attributes;

    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");

    wrapper.find("button").first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden")).toBeNull();

    wrapper.find(MenuItem).first().simulate("click");
    expect(menuAttributes.getNamedItem("aria-hidden").value).toBe("true");
  });
});
