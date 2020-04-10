import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import styles from "./MainAppBar.module.css";

import CountryMenu from "../../components/CountryMenu/CountryMenu";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import SourceMenu from "../../components/SourceMenu/SourceMenu";

// refer to https://material-ui.com/components/app-bar/#PrimarySearchAppBar.js
class MainAppBar extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.country !== prevProps.country ||
      this.props.language !== prevProps.language ||
      this.props.category !== prevProps.category ||
      this.props.source !== prevProps.source
    ) {
      this.props.updateHeadlines();
    }
  }

  render() {
    return (
      <div className={styles.grow} data-testid="main-app-bar">
        <AppBar position="fixed" data-testid="app-bar">
          <Toolbar data-testid="toolbar">
            <Typography
              className={styles.title}
              variant="h6"
              noWrap
              data-testid="title"
            >
              Newsfeed Browser
            </Typography>
            <CountryMenu
              country={this.props.country}
              countries={this.props.countries}
              setCountry={this.props.setCountry}
            />
            <LanguageMenu
              language={this.props.language}
              languages={this.props.languages}
              setLanguage={this.props.setLanguage}
            />
            <CategoryMenu
              category={this.props.category}
              categories={this.props.categories}
              setCategory={this.props.setCategory}
            />
            <SourceMenu
              source={this.props.source}
              sources={this.props.sources}
              setSource={this.props.setSource}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default MainAppBar;
