import React from "react";
import styles from "./SourceMenu.module.css";

import IconButton from "@material-ui/core/IconButton";
import BusinessIcon from "@material-ui/icons/Business";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const SourceMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    console.log(
      "SourceMenu clicked",
      event.currentTarget,
      event.currentTarget.dataset.source
    );
    setAnchorEl(null);
  };

  const menuItems = props.sources
    ? props.sources
        .sort((l, r) => (l.name < r.name ? -1 : 1))
        .map(source => (
          <MenuItem
            key={source.name}
            onClick={handleClose}
            data-source={source.name}
          >
            {source.name}
          </MenuItem>
        ))
    : null;
  return (
    <div className={styles.SourceMenu} data-testid="source-menu">
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-sourcemenu"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <BusinessIcon />
      </IconButton>
      <Menu
        id="menu-sourcemenu"
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
        <MenuItem key="-" onClick={handleClose} data-source="">
          None
        </MenuItem>
        {menuItems}
      </Menu>
    </div>
  );
};

export default SourceMenu;
