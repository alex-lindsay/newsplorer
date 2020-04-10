import React from "react";
import { render, cleanup } from "@testing-library/react";
import LanguageMenu from "../LanguageMenu";

afterEach(cleanup);

it("renders App without crashing", () => {
  const { getByTestId } = render(<LanguageMenu />);
  expect(getByTestId("language-menu")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(<LanguageMenu />);
  expect(asFragment()).toMatchSnapshot();
});
