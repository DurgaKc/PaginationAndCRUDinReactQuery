import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#006c70" }}
    >
      <Toolbar >
        {/* Home Link */}
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none",
            marginRight:"10px"
          }}
        >
          Home
        </Button>

        {/* Posts Link */}
        <Button color="inherit" component={Link} to="/posts"
        sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none",
            marginRight:"10px"
           }}
        >
          Traditional Posts
        </Button>

        {/* Query Link */}
        <Button color="inherit" component={Link} to="/query"
        sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none" }}
        >
          Get Data
        </Button>
         <Button 
        color="inherit" 
        sx={{
          fontSize: "18px",
          fontFamily: "Arial, sans-serif",
          textTransform: "none"
        }}
        onClick={handleClick}
      >
        GetFruits-data
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem 
          component={Link} 
          to="/paginated-fruits"
          onClick={handleClose}
          sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none"
          }}
        >
          Paginated Fruits
        </MenuItem>
        <MenuItem 
          component={Link} 
          to="/infinite-fruits"
          onClick={handleClose}
          sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none"
          }}
        >
          Infinite Fruits
        </MenuItem>
        <MenuItem 
          component={Link} 
          to="/infinite-autoscroll"
          onClick={handleClose}
          sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none"
          }}
        >
          Autoscroll Fruits
        </MenuItem>
      </Menu>
        <Button color="inherit" component={Link} to="/post-data"
        sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none" }}
        >
         Post Data
        </Button>
         <Button color="inherit" component={Link} to="/logout"
        sx={{
            fontSize: "18px",
            fontFamily: "Arial, sans-serif",
            textTransform: "none",
            marginRight:"10px"
           }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
