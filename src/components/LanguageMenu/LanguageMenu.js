import React from "react";
import styles from "./LanguageMenu.module.css";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const LanguageMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    setAnchorEl(null);
    props.setLanguage(event.currentTarget.dataset.language);
  };

  const menuItems = props.languages
    ? props.languages.sort().map(language => (
        <MenuItem key={language} onClick={handleClose} data-language={language}>
          {language}
        </MenuItem>
      ))
    : null;
  return (
    <div className={styles.LanguageMenu} data-testid="language-menu">
      <Badge
        badgeContent={props.language}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        color="secondary"
        overlap="circle"
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-languagemenu"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <TranslateIcon />
        </IconButton>
      </Badge>
      <Menu
        id="menu-languagemenu"
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
        <MenuItem key="-" onClick={handleClose} data-language="">
          None
        </MenuItem>
        {menuItems}
      </Menu>
    </div>
  );
};

export default LanguageMenu;
