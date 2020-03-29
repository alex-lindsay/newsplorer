import React from "react";
import { render, cleanup } from "@testing-library/react";
import MainAppBar from "../MainAppBar";

afterEach(cleanup);

it("renders App without crashing", () => {
  const { getByTestId } = render(<MainAppBar />);
  expect(getByTestId("main-app-bar")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(<MainAppBar />);
  expect(asFragment()).toMatchSnapshot();
});
