import React from "react";
import { render, cleanup } from "@testing-library/react";
import SourceMenu from "../SourceMenu";

afterEach(cleanup);

it("renders App without crashing", () => {
  const { getByTestId } = render(<SourceMenu />);
  expect(getByTestId("source-menu")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(<SourceMenu />);
  expect(asFragment()).toMatchSnapshot();
});
