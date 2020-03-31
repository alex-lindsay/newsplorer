import React from "react";
import { render, cleanup } from "@testing-library/react";
import CategoryMenu from "../CategoryMenu";

afterEach(cleanup);

it("renders App without crashing", () => {
  const { getByTestId } = render(<CategoryMenu />);
  expect(getByTestId("category-menu")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(<CategoryMenu />);
  expect(asFragment()).toMatchSnapshot();
});
