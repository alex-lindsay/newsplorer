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

const filterSources = (country, language, category, sources) =>
  sources
    ? sources.filter(source => {
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

function appReducer(oldState = initialState, action) {
  let state = { ...oldState };
  state.countries = [...oldState.countries];
  state.languages = [...oldState.languages];
  switch (action.type) {
    case "SET_COUNTRY":
      if (action.country !== undefined) {
        state.country = action.country !== "" ? action.country : null;
        state.source = null;
      }
      break;
    case "SET_LANGUAGE":
      if (action.language !== undefined) {
        state.language = action.language !== "" ? action.language : null;
        state.source = null;
      }
      break;
    case "SET_CATEGORY":
      if (action.category !== undefined) {
        state.category = action.category !== "" ? action.category : null;
        state.source = null;
      }
      break;
    case "SET_SOURCE":
      if (action.source !== undefined) {
        state.source = action.source !== "" ? action.source : null;
      }
      break;
    default:
      return state;
  }
  state.sources = filterSources(
    state.country,
    state.language,
    state.category,
    initialState.sources
  );
  console.log("After reducer", state);
  return state;
}

// const appReducer = combineReducers({ country, countries, language, languages });

export default appReducer;
