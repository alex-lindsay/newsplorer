import React, { Component } from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import styles from "./MainAppBar.module.css";

import CountryMenu from "../../components/CountryMenu/CountryMenu";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import SourceMenu from "../../components/SourceMenu/SourceMenu";

import { setCountry } from "../../store/actions";

import { sampleCountries } from "../../data/sample_countries";
import { sampleLanguages } from "../../data/sample_languages";
import { sampleCategories } from "../../data/sample_categories";
import { sampleSources } from "../../data/sample_sources";

// refer to https://material-ui.com/components/app-bar/#PrimarySearchAppBar.js
class MainAppBar extends Component {
  render() {
    console.log("MainAppBar.render props", this.props);
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
              Newsfeed Browser
            </Typography>
            <CountryMenu
              country={this.props.country}
              countries={this.props.countries}
              setCountry={this.props.setCountry}
            />
            <LanguageMenu languages={sampleLanguages} />
            <CategoryMenu categories={sampleCategories} />
            <SourceMenu sources={sampleSources.sources} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    country: state.country,
    countries: state.countries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCountry: country => dispatch(setCountry(country)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
