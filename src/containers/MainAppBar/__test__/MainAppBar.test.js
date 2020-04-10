import React from "react";
import { createStore } from "redux";
import { render, cleanup } from "@testing-library/react";
import MainAppBar from "../MainAppBar";
import appReducer from "../../../store/reducers";
import { Provider } from "react-redux";

afterEach(cleanup);

it("renders App without crashing", () => {
  const store = createStore(appReducer);
  const { getByTestId } = render(
    <Provider store={store}>
      <MainAppBar />
    </Provider>
  );
  expect(getByTestId("main-app-bar")).toBeInTheDocument();
});

it("matches expected snapshot", () => {
  const store = createStore(appReducer);
  const { asFragment } = render(
    <Provider store={store}>
      <MainAppBar />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
