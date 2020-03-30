import { sampleHeadlines } from "../../data/sample_headlines";
import { sampleSources } from "../../data/sample_sources";
import { sampleCategories } from "../../data/sample_categories";
import { sampleLanguages } from "../../data/sample_languages";
import { sampleCountries } from "../../data/sample_countries";

const initialState = {
  showStory: false,
  sources: sampleSources.sources,
  categories: sampleCategories,
  languages: sampleLanguages,
  country: sampleCountries,
  headlines: sampleHeadlines.articles,
  source: null,
  category: null,
  language: null,
  country: null,
  story: null,
};
