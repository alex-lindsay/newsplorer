import React from "react";
import { createStore } from "redux";
import { render, cleanup } from "@testing-library/react";
import EnzymeToJson from "enzyme-to-json";
// import { shallow, mount } from "enzyme";
import { createShallow, createMount } from "@material-ui/core/test-utils";
import { Provider } from "react-redux";
import { InputBase } from "@material-ui/core/InputBase";

import appReducer from "../../../store/reducers";
import MainAppBar from "../MainAppBar";

describe("MainAppBar", () => {
  const setSearchKey = jest.fn((key) => key);
  const updateHeadlines = jest.fn();

  let props = {
    setSearchKey,
    updateHeadlines,
  };
  let wrapper;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    wrapper = createShallow(<MainAppBar {...props} />);
  });

  it("matches expected snapshot", () => {
    const mounted = createMount(<MainAppBar />);
    expect(EnzymeToJson(mounted)).toMatchSnapshot();
  });

  it("requests the headlines be updated if key props have changed", () => {
    const newCountry = "ca";
    const useRefSpy = jest
      .spyOn(React, "useRef")
      .mockReturnValueOnce({ current: { updateHeadlines } });

    wrapper.setProps({ country: newCountry }, () => {
      expect(updateHeadlines).toHaveBeenCalledWith(newCountry);
    });
  });
  // it("calls a search function when the search bar value is changed but not still changing", () => {
  //   const store = createStore(appReducer);
  //   const wrapper = shallow(
  //     <Provider store={store}>
  //       <MainAppBar
  //         setSearchKey={setSearchKey}
  //         updateHeadlines={updateHeadlines}
  //       />
  //     </Provider>
  //   );
  //   const inputBox = wrapper.find("input");
  //   const searchKeyLong = "Hello";
  //   const searchKeyShort = "He";
  //   expect(wrapper).toMatchSnapshot();
  //   inputBox.simulate("focus");
  //   inputBox.simulate("change", { target: { value: searchKeyLong } });
  //   setTimeout(() => {
  //     expect(wrapper).toMatchSnapshot();
  //     expect(setSearchKey).toHaveBeenCalledWith(searchKeyLong);

  //     inputBox.simulate("change", { target: { value: searchKeyShort } });
  //     setTimeout(() => {
  //       expect(setSearchKey).toHaveBeenCalledLastWith(null);
  //       expect(setSearchKey).toHaveBeenCalledTimes(2);
  //       expect(updateHeadlines).toHaveBeenCalledTimes(2);
  //     }, 2000);
  //   }, 2000);
  // });

  // it("updates headlines when country changes", () => {
  //   const store = createStore(appReducer);
  //   const wrapper = shallow(
  //     <Provider store={store}>
  //       <MainAppBar
  //         setSearchKey={setSearchKey}
  //         updateHeadlines={updateHeadlines}
  //       />
  //     </Provider>
  //   );
  //   wrapper.setProps({ country: "ca" });
  //   expect(updateHeadlines).toHaveBeenCalled();
  // });
});
