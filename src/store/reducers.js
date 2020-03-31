import { sampleHeadlines } from "../data/sample_headlines";
import { sampleSources } from "../data/sample_sources";
import { sampleCategories } from "../data/sample_categories";
import { sampleLanguages } from "../data/sample_languages";
import { sampleCountries } from "../data/sample_countries";
// import { combineReducers } from "redux";

export const initialState = {
  country: null,
  countries: sampleCountries,
  language: null,
  languages: sampleLanguages,
  category: null,
  categories: sampleCategories,
  source: null,
  sources: sampleSources.sources,
  headlines: sampleHeadlines.articles,
  showStory: false,
  story: null,
};

function appReducer(oldState = initialState, action) {
  let state = { ...oldState };
  state.countries = [...oldState.countries];
  state.languages = [...oldState.languages];
  switch (action.type) {
    case "SET_COUNTRY":
      if (action.country !== undefined) {
        state.country = action.country !== "" ? action.country : null;
      }
      break;
    case "SET_LANGUAGE":
      if (action.language !== undefined) {
        state.language = action.language !== "" ? action.language : null;
      }
      break;
    default:
      return state;
  }
  return state;
}

// const appReducer = combineReducers({ country, countries, language, languages });

export default appReducer;
