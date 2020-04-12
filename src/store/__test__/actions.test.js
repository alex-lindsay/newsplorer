import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as actions from "../actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("simple actions", () => {
  it("should create an action to change the country", () => {
    const country = "en";
    const expectedAction = {
      type: actions.SET_COUNTRY,
      country,
    };
    expect(actions.setCountry(country)).toEqual(expectedAction);
  });

  it("should create an action to change the language", () => {
    const language = "es";
    const expectedAction = {
      type: actions.SET_LANGUAGE,
      language,
    };
    expect(actions.setLanguage(language)).toEqual(expectedAction);
  });

  it("should create an action to change the category", () => {
    const category = "business";
    const expectedAction = {
      type: actions.SET_CATEGORY,
      category,
    };
    expect(actions.setCategory(category)).toEqual(expectedAction);
  });

  it("should create an action to change the source", () => {
    const source = "latimes";
    const expectedAction = {
      type: actions.SET_SOURCE,
      source,
    };
    expect(actions.setSource(source)).toEqual(expectedAction);
  });

  it("should create an action to change the story", () => {
    const story = 2;
    const expectedAction = {
      type: actions.SET_STORY,
      story,
    };
    expect(actions.setStory(story)).toEqual(expectedAction);
  });

  it("should create an action to initilize the sources", () => {
    const data = {
      status: "ok",
      sources: [
        {
          id: "abc-news",
          name: "ABC News",
          description:
            "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
          url: "https://abcnews.go.com",
          category: "general",
          language: "en",
          country: "us",
        },
        {
          id: "abc-news-au",
          name: "ABC News (AU)",
          description:
            "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
          url: "http://www.abc.net.au/news",
          category: "general",
          language: "en",
          country: "au",
        },
      ],
    };
    const expectedAction = {
      type: actions.INITIALIZE_SOURCES,
      sources: data.sources,
      sourcesAreInitialized: true,
    };
    expect(actions.initializeSources(data)).toEqual(expectedAction);
  });
});
