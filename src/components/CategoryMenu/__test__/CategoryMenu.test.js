import React from "react";
import { shallow, mount } from "enzyme";

import CategoryMenu from "../CategoryMenu";

import { sampleCategories } from "../../../data/sample_categories";
import { ExpansionPanelActions } from "@material-ui/core";

const mockSetCategory = jest.fn();

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

  it("sets the selected category when clicked", () => {
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
    console.log(mockSetCategory.mock.results[0].value);
    expect(mockSetCategory.mock.results[0].value).toBe(sampleCategories[4]);
  });
});
