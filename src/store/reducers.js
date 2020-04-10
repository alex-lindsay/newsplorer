import { cloneDeep } from "lodash";

import {
  SET_COUNTRY,
  SET_LANGUAGE,
  SET_CATEGORY,
  SET_SOURCE,
  SET_STORY,
  INITIALIZE_SOURCES,
  INITIALIZE_HEADLINES,
  RELATED_TOPICS,
  SET_TOPIC_RELATED_ARTICLE,
  SET_ARTICLE_RELATED_TOPICS,
  SET_SEARCH_KEY,
} from "../store/actions";
// import { combineReducers } from "redux";

export const initialState = {
  country: null,
  countries: [],
  allCountries: [],
  language: null,
  languages: [],
  allLanguages: [],
  category: null,
  categories: [],
  allCategories: [],
  source: null,
  allSources: [],
  sources: [],
  sourcesAreInitialized: false,
  headlines: [],
  headlineVersion: 0,
  showStory: false,
  story: null,
  searchKey: null,
  topics: {},
};

const filterSources = (country, language, category, sources) =>
  sources
    ? sources.filter((source) => {
        let result = true;
        if (country !== null && source.country !== country) {
          result = false;
        }
        if (language !== null && source.language !== language) {
          result = false;
        }
        if (category !== null && source.category !== category) {
          result = false;
        }
        return result;
      })
    : [];

const countriesFromSources = (sources) =>
  Array.from(new Set(sources.map((source) => source.country)));

const languagesFromSources = (sources) =>
  Array.from(new Set(sources.map((source) => source.language)));

const categoriesFromSources = (sources) =>
  Array.from(new Set(sources.map((source) => source.category)));

function appReducer(oldState = initialState, action) {
  let state = cloneDeep(oldState);
  // state.countries = [...oldState.countries];
  // state.languages = [...oldState.languages];
  // state.categories = [...oldState.categories];
  switch (action.type) {
    case SET_COUNTRY:
      if (action.country !== undefined) {
        state.country = action.country !== "" ? action.country : null;
        state.source = null;
      }
      break;
    case SET_LANGUAGE:
      if (action.language !== undefined) {
        state.language = action.language !== "" ? action.language : null;
        state.source = null;
      }
      break;
    case SET_CATEGORY:
      if (action.category !== undefined) {
        state.category = action.category !== "" ? action.category : null;
        state.source = null;
      }
      break;
    case SET_SOURCE:
      if (action.source !== undefined) {
        state.source = action.source !== "" ? action.source : null;
      }
      break;
    case SET_STORY:
      if (action.story !== undefined && action.story != null) {
        state.story = state.headlines[action.story];
      } else {
        state.story = null;
      }
      break;
    case INITIALIZE_SOURCES:
      state.allSources = action.sources;
      state.sources = action.sources;
      state.sourcesAreInitialized = action.sourcesAreInitialized;
      state.allCountries = countriesFromSources(state.allSources);
      state.countries = countriesFromSources(state.sources);
      state.allLanguages = languagesFromSources(state.allSources);
      state.languages = languagesFromSources(state.sources);
      state.allCategories = categoriesFromSources(state.allSources);
      state.categories = categoriesFromSources(state.sources);
      break;
    case INITIALIZE_HEADLINES:
      state.headlines = action.headlines;
      break;
    case RELATED_TOPICS:
      console.log("RELATED TOPICS****", action);
      break;
    case SET_TOPIC_RELATED_ARTICLE:
      if (!state.topics[action.topic]) {
        state.topics[action.topic] = {};
      }
      if (!state.topics[action.topic][action.relatedSource]) {
        state.topics[action.topic][action.relatedSource] = {};
      }
      state.topics[action.topic][action.relatedSource][action.title] = {
        url: action.url,
        extract: action.extract,
      };
      break;
    case SET_ARTICLE_RELATED_TOPICS:
      for (let index = 0; index < state.headlines.length; index++) {
        if (
          state.headlines[index].title === action.article.title &&
          state.headlines[index].source.name === action.article.source.name
        ) {
          state.headlines[index].topics = action.topics;
          break;
        }
      }
      break;
    case SET_SEARCH_KEY:
      state.searchKey = action.searchKey;
      break;
    default:
      return state;
  }
  state.sources = filterSources(
    state.country,
    state.language,
    state.category,
    state.allSources
  );
  // console.log("After reducer", state);
  return state;
}

// const appReducer = combineReducers({ country, countries, language, languages });

export default appReducer;
