import axios from "axios";

/* Action Types */
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_SOURCE = "SET_SOURCE";
export const SET_STORY = "SET_STORY";
export const ADD_RELATED_TOPICS = "ADD_RELATED_TOPICS";
export const RELATED_TOPICS = "RELATED_TOPICS";

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

export function addRelatedTopics(data) {
  return {
    type: ADD_RELATED_TOPICS,
    data: data,
  };
}

export function getInitialSources() {
  return function (dispatch) {
    console.log("getInitialSources");
    return axios
      .get(
        `https://newsapi.org/v2/sources?apiKey=debcc9b1affb485da106a7b5b422abc0`
      )
      .then((response) => {
        console.log("after axios", response.data);
        dispatch(initializeSources(response.data));
      })
      .catch((error) => {
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

function relatedTopicsFromHeadlines(dispatch, headlines) {
  const punctuation = "!@#$%^&*()_+`-={}|[]\\:\t\r\n\";'<>?,./“”‘’…";
  console.log("relatedTopicsFromHeadlines START");
  console.log("headlines", headlines);
  let topics = {};
  let articlesTopics = {};
  headlines.articles.forEach((article) => {
    let current = [];
    let articleTopics = [];
    let words = article && article.content ? article.content.split(/\s/) : [];
    let endOfTopic = false;
    for (let index = 0; index < words.length; index++) {
      let word = words[index];
      // let originalWord = word;
      // while there's leading punctuation, remove it
      for (let i = 0; i < word.length; i++) {
        if (punctuation.indexOf(word.charAt(0)) !== -1) {
          word = word.substring(1);
          // console.log("removed leading punctuation", originalWord, word);
        } else {
          break;
        }
      }
      // while there's trailing punctuation, remove it
      for (let i = 0; i < word.length; i++) {
        if (punctuation.indexOf(word.charAt(word.length - 1)) !== -1) {
          word = word.substring(0, word.length - 1);
          // console.log("removed trailing punctuation", originalWord, word);
          endOfTopic = true;
        } else {
          break;
        }
      }

      // if the word is capitalized, add it to the current topic
      if (word.charAt(0) !== word.charAt(0).toLowerCase()) {
        current.push(word);
      } else {
        endOfTopic = true;
      }
      if (index === words.length - 1) {
        endOfTopic = true;
      }
      // if the topic is to be closed (or it's the last word), add it (joined using spaces) to topics keyed on it in lowercase
      if (endOfTopic) {
        let topic = current.join(" ");
        if (topic !== "") {
          topics[topic.toLowerCase()] = { text: topic };
          articleTopics.push(topic);
        }
        endOfTopic = false;
        current = [];
      }
      // console.log(word, current, topics, articleTopics);
    }
    articlesTopics[article.title] = articleTopics;
    // console.log(words);
  });
  console.log(topics, articlesTopics);
  // TODO - I need to get the language associated with the article from
  // the source to know what language to look up in mediawiki
  for (let topic in topics) {
    dispatch(getRelatedContent(topic));
  }
  console.log(topics, articlesTopics);
  return { type: RELATED_TOPICS, topics, articlesTopics };
}

export function getRelatedContent(topic, language = "en") {
  return function (dispatch, getState) {
    axios
      .get("https://www.mediawiki.org/w/api.php", {
        params: {
          srsearch: topic,
          action: "query",
          list: "search",
          srsort: "relevance",
          format: "json",
        },
      })
      .then((res) => console.log(topic, res))
      .catch((err) => console.error(topic, err));
  };
}

export function getHeadlines() {
  return function (dispatch, getState) {
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
      let sources = state.sources.map((source) => source.id);
      let sourcesString = sources.join(",");
      query = [`sources=${sourcesString}`];
    }
    if (state.source) {
      query = [`sources=${state.source}`];
    }
    let queryString = query.join("&");
    // console.log("query", query, queryString);
    // let sources = state.sources.map(source => source.id).join(",");
    return axios
      .get(
        `https://newsapi.org/v2/top-headlines?${queryString}&apiKey=debcc9b1affb485da106a7b5b422abc0`
      )
      .then((response) => {
        // console.log("after axios", response.data);
        response.data.articles.sort((l, r) => (l < r ? -1 : 1));
        dispatch(initializeHeadlines(response.data));
        dispatch(relatedTopicsFromHeadlines(dispatch, response.data));
      })
      .catch((error) => {
        console.warn("TODO REPLACE THIS WITH AN ERROR DISPATCH");
        console.error("Error getting initial headlines:", error);
      });
  };
}
