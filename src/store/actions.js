/* Action Types */
export const GET_HEADLINES = "GET_HEADLINES";
export const GET_SOURCES = "GET_SOURCES";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const SET_COUNTRY = "SET_COUNTRY";

export const GET_STORY = "GET_STORY";

/* Action Creators */
export function getHeadlines() {
  return {
    type: GET_HEADLINES,
  };
}

export function getSources() {
  return {
    type: GET_SOURCES,
  };
}

export function getCategories() {
  return {
    type: GET_CATEGORIES,
  };
}

export function getLanguages() {
  return {
    type: GET_LANGUAGES,
  };
}

export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    language: language,
  };
}

export function getCountries() {
  return {
    type: GET_COUNTRIES,
  };
}

export function setCountry(country) {
  return {
    type: SET_COUNTRY,
    country: country,
  };
}

export function getStory() {
  return {
    type: GET_STORY,
  };
}
