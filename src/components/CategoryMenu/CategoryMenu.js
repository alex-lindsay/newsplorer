import React from "react";
import styles from "./CategoryMenu.module.css";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import CategoryIcon from "@material-ui/icons/Category";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const CategoryMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    setAnchorEl(null);
    props.setCategory(event.currentTarget.dataset.category);
  };

  const menuItems = props.categories
    ? props.categories.sort().map(category => (
        <MenuItem
          key={category}
          onClick={handleClose}
          data-category={category}
          data-categoryid={category}
        >
          {category}
        </MenuItem>
      ))
    : null;
  return (
    <div className={styles.CategoryMenu} data-testid="category-menu">
      <Badge
        badgeContent={
          props.category ? props.category.substring(0, 3) + "…" : null
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        color="secondary"
        overlap="circle"
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-categorymenu"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <CategoryIcon />
        </IconButton>
      </Badge>
      <Menu
        id="menu-categorymenu"
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
        <MenuItem
          key="-"
          onClick={handleClose}
          data-category=""
          data-categoryid=""
        >
          None
        </MenuItem>
        {menuItems}
      </Menu>
    </div>
  );
};

export default CategoryMenu;
