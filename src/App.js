import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import MainAppBar from "./containers/MainAppBar/MainAppBar";
import Headlines from "./containers/Headlines/Headlines";

import {
  setCountry,
  setLanguage,
  setCategory,
  setSource,
  getInitialSources,
  getHeadlines,
} from "./store/actions";

// import styles from "./ComponentName.module.css";

class App extends Component {
  componentDidMount() {
    this.props.getInitialSources();
    this.props.setCountry("us");
    // this.props.updateHeadlines({ country: "us" });
  }

  render() {
    return (
      <div className="App" data-testid="app">
        <MainAppBar
          country={this.props.country}
          countries={this.props.countries}
          setCountry={this.props.setCountry}
          language={this.props.language}
          languages={this.props.languages}
          setLanguage={this.props.setLanguage}
          category={this.props.category}
          categories={this.props.categories}
          setCategory={this.props.setCategory}
          source={this.props.source}
          sources={this.props.sources}
          setSource={this.props.setSource}
          headlineVersion={this.props.headlineVersion}
          updateHeadlines={this.props.updateHeadlines}
        />
        <Headlines headlines={this.props.headlines} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    country: state.country,
    countries: state.countries,
    language: state.language,
    languages: state.languages,
    category: state.category,
    categories: state.categories,
    source: state.source,
    sources: state.sources,
    headlineVersion: state.headlineVersion,
    headlines: state.headlines,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCountry: country => dispatch(setCountry(country)),
    setLanguage: language => dispatch(setLanguage(language)),
    setCategory: category => dispatch(setCategory(category)),
    setSource: source => dispatch(setSource(source)),
    getInitialSources: () => dispatch(getInitialSources()),
    updateHeadlines: params => dispatch(getHeadlines(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
