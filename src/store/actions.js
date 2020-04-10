import axios from "axios";
import wiki from "wikijs";

/* Action Types */
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_SOURCE = "SET_SOURCE";
export const SET_STORY = "SET_STORY";
export const ADD_RELATED_TOPICS = "ADD_RELATED_TOPICS";
export const RELATED_TOPICS = "RELATED_TOPICS";
export const SET_TOPIC_RELATED_ARTICLE = "SET_TOPIC_RELATED_ARTICLE";
export const SET_ARTICLE_RELATED_TOPICS = "SET_ARTICLE_RELATED_TOPICS";
export const SET_SEARCH_KEY = "SET_SEARCH_KEY";

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

function topicIsLongEnough(topic) {
  return topic.length >= 5;
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
        if (topicIsLongEnough(topic)) {
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
    dispatch(setArticleRelatedTopics(article, articleTopics));
  });
  console.log({
    function: "relatedTopicsFromHeadlines",
    topics,
    articlesTopics,
  });
  // TODO - I need to get the language associated with the article from
  // the source to know what language to look up in mediawiki
  for (let topic in topics) {
    dispatch(getRelatedContent(topic));
  }
  // return { type: RELATED_TOPICS, topics, articlesTopics };
}

export function setArticleRelatedTopics(article, topics) {
  return {
    type: SET_ARTICLE_RELATED_TOPICS,
    article,
    topics,
  };
}

export function getRelatedContent(topic, language = "en") {
  return function (dispatch, getState) {
    console.log("getRelatedContent", topic, "START");
    return wiki()
      .search(topic, 3)
      .then((data) => {
        console.log({
          function: "getRelatedContent wiki.search",
          topic,
          data,
        });
        if (data && data.results) {
          data.results.forEach((result) => {
            console.log("ABOUT TO SEND TO GET SUMMARY", result);
            dispatch(
              getRelatedWikipediaSummaries(dispatch, topic, result, language)
            );
          });
        }
      })
      .catch((err) => {
        console.error("getRelatedContent Wikipedia", topic, err.message);
      });
  };
}

export function setTopicRelatedArticle(
  topic,
  relatedSource,
  title,
  language,
  extract,
  url
) {
  return {
    type: SET_TOPIC_RELATED_ARTICLE,
    topic,
    relatedSource,
    title,
    language,
    extract,
    url,
  };
}

export function getRelatedWikipediaSummaries(
  dispatch,
  topic,
  title,
  language = "en"
) {
  return function (dispatch, getState) {
    console.log("getRelatedWikipediaSummaries", topic, "START");

    return wiki()
      .page(title)
      .then((page) =>
        Promise.all([
          page.summary(),
          page.fullInfo(),
          page.images(),
          page.url(),
        ])
      )
      .then(([summary, fullInfo, images, url]) => {
        console.log({
          function: "getRelatedWikipediaSummaries",
          topic,
          title,
          summary,
          fullInfo,
          images,
          url,
        });
        dispatch(
          setTopicRelatedArticle(
            topic,
            "wikipedia",
            title,
            language,
            summary,
            url
          )
        );
      })
      .catch((err) => console.error({ topic, err }));
  };
}

export function getHeadlines() {
  return function (dispatch, getState) {
    console.log("getHeadlines");
    const state = getState();
    let params = {};
    if (state.country) {
      params.country = state.country;
    }
    if (state.language) {
      params.language = state.language;
    }
    if (state.category) {
      params.category = state.category;
    }
    if (state.sources.length !== 0) {
      let sources = state.sources.map((source) => source.id);
      let sourcesString = sources.join(",");
      params.sources = sourcesString;
      delete params.country;
      delete params.language;
      delete params.category;
    }
    if (state.source) {
      params = { sources: state.source };
    }
    if (state.searchKey !== null) {
      params.q = state.searchKey;
    }
    return axios
      .get(`https://newsapi.org/v2/top-headlines`, {
        params: { ...params, apiKey: "debcc9b1affb485da106a7b5b422abc0" },
      })
      .then((response) => {
        // console.log("after axios", response.data);
        response.data.articles.sort((l, r) => (l < r ? -1 : 1));
        dispatch(initializeHeadlines(response.data));
        relatedTopicsFromHeadlines(dispatch, response.data);
      })
      .catch((error) => {
        console.warn("TODO REPLACE THIS WITH AN ERROR DISPATCH");
        console.error("Error getting initial headlines:", error);
      });
  };
}

export function setSearchKey(searchKey) {
  console.log("setSearchKey", searchKey);
  return {
    type: SET_SEARCH_KEY,
    searchKey: searchKey,
  };
}
