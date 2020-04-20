import React, { useEffect, useRef } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import { fade, makeStyles } from "@material-ui/core/styles";
import styles from "./MainAppBar.module.css";

import CountryMenu from "../../components/CountryMenu/CountryMenu";
import LanguageMenu from "../../components/LanguageMenu/LanguageMenu";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import SourceMenu from "../../components/SourceMenu/SourceMenu";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function useIsChanged(value) {
  const prevValue = usePrevious(value);
  return prevValue !== value;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// refer to https://material-ui.com/components/app-bar/#PrimarySearchAppBar.js
const MainAppBar = (props) => {
  const { country, language, category, source } = props;
  const countryHasChanged = useIsChanged(country);
  const languageHasChanged = useIsChanged(language);
  const categoryHasChanged = useIsChanged(category);
  const sourceHasChanged = useIsChanged(source);

  const handleSearchChange = (evt) => {
    const value = evt.target.value;
    if (searchTimer !== null) {
      clearTimeout(searchTimer);
    }
    searchTimer = null;
    if (value.length > 2) {
      searchTimer = setTimeout(() => {
        props.setSearchKey(value);
        props.updateHeadlines();
      }, 2000);
    } else {
      searchTimer = setTimeout(() => {
        props.setSearchKey(null);
        props.updateHeadlines();
      }, 2000);
    }
  };

  let searchTimer = null;

  if (
    countryHasChanged ||
    languageHasChanged ||
    categoryHasChanged ||
    sourceHasChanged
  ) {
    props.updateHeadlines();
  }
  const classes = useStyles();
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
            country={props.country}
            countries={props.countries}
            setCountry={props.setCountry}
          />
          <LanguageMenu
            language={props.language}
            languages={props.languages}
            setLanguage={props.setLanguage}
          />
          <CategoryMenu
            category={props.category}
            categories={props.categories}
            setCategory={props.setCategory}
          />
          <SourceMenu
            source={props.source}
            sources={props.sources}
            setSource={props.setSource}
          />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handleSearchChange}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MainAppBar;
