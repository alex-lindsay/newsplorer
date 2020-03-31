import { sampleHeadlines } from "../data/sample_headlines";
import { sampleSources } from "../data/sample_sources";
import { sampleCategories } from "../data/sample_categories";
import { sampleLanguages } from "../data/sample_languages";
import { sampleCountries } from "../data/sample_countries";
import { combineReducers } from "redux";

const initialState = {
  showStory: false,
  countries: sampleCountries,
  languages: sampleLanguages,
  categories: sampleCategories,
  sources: sampleSources.sources,
  headlines: sampleHeadlines.articles,
  source: null,
  category: null,
  language: null,
  country: null,
  story: null,
};

function country(oldState = initialState, action) {
  let state = oldState.country;
  console.log("country reducer", { state });
  switch (action.type) {
    case "SET_COUNTRY":
      return action.country !== "" ? action.country : null;
    default:
      return state;
  }
}

function countries(oldState = initialState, action) {
  let state = oldState.countries;
  console.log("countries reducer", { state });
  switch (action.type) {
    default:
      return state;
  }
}

const appReducer = combineReducers({ country, countries });

export default appReducer;
