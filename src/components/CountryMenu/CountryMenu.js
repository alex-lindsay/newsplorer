import React from "react";
import styles from "./CountryMenu.module.css";

import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/Language";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const CountryMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    console.log(
      "CountryMenu clicked",
      event.currentTarget,
      event.currentTarget.dataset.country
    );
    setAnchorEl(null);
  };

  const menuItems = props.countries
    ? props.countries.sort().map(country => (
        <MenuItem key={country} onClick={handleClose} data-country={country}>
          {country}
        </MenuItem>
      ))
    : null;
  return (
    <div className={styles.CountryMenu} data-testid="country-menu">
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-countrymenu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="menu-countrymenu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem key="-" onClick={handleClose} data-country="">
          None
        </MenuItem>
        {menuItems}
      </Menu>
    </div>
  );
};

export default CountryMenu;
