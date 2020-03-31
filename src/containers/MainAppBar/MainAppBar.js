import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import styles from "./MainAppBar.module.css";

import CountryMenu from "../../components/CountryMenu/CountryMenu";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";

import { sampleCountries } from "../../data/sample_countries";
import { sampleLanguages } from "../../data/sample_languages";
import { sampleCategories } from "../../data/sample_categories";
import { sampleSources } from "../../data/sample_sources";

// refer to https://material-ui.com/components/app-bar/#PrimarySearchAppBar.js
class MainAppBar extends Component {
  render() {
    // console.log({ sources: sampleSources.sources });
    // console.log({ categories: sampleCategories });
    // console.log({ languages: sampleLanguages });

    return (
      <div className={styles.grow} data-testid="main-app-bar">
        <AppBar position="static" data-testid="app-bar">
          <Toolbar data-testid="toolbar">
            <Typography
              className={styles.title}
              variant="h6"
              noWrap
              data-testid="title"
            >
              Material-UI
            </Typography>
            <CountryMenu countries={sampleCountries} />
            <LanguageMenu languages={sampleLanguages} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default MainAppBar;
