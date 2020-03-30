import React from "react";
import { render, cleanup } from "@testing-library/react";
import Headlines from "../Headlines";

afterEach(cleanup);

it("renders App without crashing", () => {
  const { getByTestId } = render(<Headlines />);
  expect(getByTestId("headlines")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(<Headlines />);
  expect(asFragment()).toMatchSnapshot();
});
