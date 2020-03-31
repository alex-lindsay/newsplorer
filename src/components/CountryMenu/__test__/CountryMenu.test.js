import React from "react";
import { render, cleanup } from "@testing-library/react";
import CountryMenu from "../CountryMenu";

afterEach(cleanup);

it("renders App without crashing", () => {
  const { getByTestId } = render(<CountryMenu />);
  expect(getByTestId("country-menu")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const { asFragment } = render(<CountryMenu />);
  expect(asFragment()).toMatchSnapshot();
});
