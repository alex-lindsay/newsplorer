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

function country(oldState = initialState.country, action) {
  console.log("country reducer", { oldState });
  switch (action.type) {
    case "SET_COUNTRY":
      return action.country !== "" ? action.country : null;
    default:
      return oldState;
  }
}

function countries(oldState = initialState.countries, action) {
  console.log("countries reducer", { oldState });
  switch (action.type) {
    default:
      return oldState;
  }
}

const appReducer = combineReducers({ country, countries });

export default appReducer;
