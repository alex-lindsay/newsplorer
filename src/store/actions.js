import axios from "axios";

/* Action Types */
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_SOURCE = "SET_SOURCE";

export const INITIALIZE_SOURCES = "INITIALIZE_SOURCES";

export const INITIALIZE_HEADLINES = "INITIALIZE_HEADLINES";

/* Action Creators */
export function setCountry(country) {
  return {
    type: SET_COUNTRY,
    country: country,
  };
}

export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    language: language,
  };
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    category: category,
  };
}

export function setSource(source) {
  return {
    type: SET_SOURCE,
    source: source,
  };
}

export function initializeSources(data) {
  return {
    type: INITIALIZE_SOURCES,
    sources: data ? data.sources : [],
    sourcesAreInitialized: true,
  };
}

export function getInitialSources() {
  return function(dispatch) {
    console.log("getInitialSources");
    return axios
      .get(
        `https://newsapi.org/v2/sources?apiKey=debcc9b1affb485da106a7b5b422abc0`
      )
      .then(response => {
        console.log("after axios", response.data);
        dispatch(initializeSources(response.data));
        dispatch(getHeadlines());
      })
      .catch(error => {
        console.warn("TODO REPLACE THIS WITH AN ERROR DISPATCH");
        console.error("Error getting initial sources:", error);
      });
  };
}

export function initializeHeadlines(data) {
  return {
    type: INITIALIZE_HEADLINES,
    headlines: data ? data.articles : [],
    headlineVersion: Date.now(),
  };
}

export function getHeadlines() {
  return function(dispatch) {
    console.log("getHeadlines");
    return axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=debcc9b1affb485da106a7b5b422abc0`
      )
      .then(response => {
        console.log("after axios", response.data);
        dispatch(initializeHeadlines(response.data));
      })
      .catch(error => {
        console.warn("TODO REPLACE THIS WITH AN ERROR DISPATCH");
        console.error("Error getting initial headlines:", error);
      });
  };
}
