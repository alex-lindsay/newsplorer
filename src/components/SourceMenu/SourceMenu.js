import React from "react";
import styles from "./SourceMenu.module.css";

import IconButton from "@material-ui/core/IconButton";
import BusinessIcon from "@material-ui/icons/Business";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";

const SourceMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    setAnchorEl(null);
    props.setSource(event.currentTarget.dataset.sourceid);
  };

  const menuItems = props.sources
    ? props.sources
        .sort((l, r) => (l.name < r.name ? -1 : 1))
        .map(source => (
          <Tooltip
            key={source.name}
            title={source.description}
            placement="right"
            aria-label={source.description}
          >
            <MenuItem
              onClick={handleClose}
              data-source={source.name}
              data-sourceid={source.id}
            >
              {source.name}
            </MenuItem>
          </Tooltip>
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
        <MenuItem key="-" onClick={handleClose} data-source="" data-sourceid="">
          None
        </MenuItem>
        {menuItems}
      </Menu>
      <Typography
        className={styles.source}
        variant="h6"
        noWrap
        data-testid="source"
      >
        {props.source}
      </Typography>
    </div>
  );
};

export default SourceMenu;
