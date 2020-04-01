/* Action Types */
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_SOURCE = "SET_SOURCE";

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
