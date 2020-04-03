import axios from "axios";

/* Action Types */
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_SOURCE = "SET_SOURCE";
export const SET_STORY = "SET_STORY";

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

export function setStory(story) {
  return {
    type: SET_STORY,
    story: story,
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
    headlineVersion: Math.floor(Date.now() / 10000) * 10000,
  };
}

export function getHeadlines() {
  return function(dispatch, getState) {
    console.log("getHeadlines");
    const state = getState();
    let query = [];
    if (state.country) {
      query.push(`country=${state.country}`);
    }
    if (state.language) {
      query.push(`language=${state.language}`);
    }
    if (state.category) {
      query.push(`category=${state.category}`);
    }
    if (state.sources.length !== 0) {
      let sources = state.sources.map(source => source.id);
      let sourcesString = sources.join(",");
      query = [`sources=${sourcesString}`];
    }
    if (state.source) {
      query = [`sources=${state.source}`];
    }
    let queryString = query.join("&");
    console.log("query", query, queryString);
    // let sources = state.sources.map(source => source.id).join(",");
    return axios
      .get(
        `https://newsapi.org/v2/top-headlines?${queryString}&apiKey=debcc9b1affb485da106a7b5b422abc0`
      )
      .then(response => {
        console.log("after axios", response.data);
        response.data.articles.sort((l, r) => (l < r ? -1 : 1));
        dispatch(initializeHeadlines(response.data));
      })
      .catch(error => {
        console.warn("TODO REPLACE THIS WITH AN ERROR DISPATCH");
        console.error("Error getting initial headlines:", error);
      });
  };
}
