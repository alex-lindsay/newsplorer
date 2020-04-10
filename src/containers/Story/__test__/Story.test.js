import React from "react";
import { render, cleanup } from "@testing-library/react";
import Story from "../Story";

afterEach(cleanup);

it("renders Story without crashing", () => {
  const { getByTestId } = render(<Story />);
  expect(getByTestId("story")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(<Story />);
  expect(asFragment()).toMatchSnapshot();
});
