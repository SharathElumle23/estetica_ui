import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <AppBar position="static" color="white"elevation={0} >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section: Menu Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" component="div" color="blue">
              Estetica
            </Typography>
          </Box>
          <Box display='flex' flexDirection='column' textAlign='start'>
            <Typography variant="h6" color="inherit">
              Welcome Back, Rajesh
            </Typography>
            <Typography variant="body2" color="inherit">
              Hello, here you can manage your orders by zone
            </Typography>

          </Box>
        </Box>

        {/* Right Section: Search + Logo + Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "white",
              px: 1,
              borderRadius: 2,
              width: "250px",
            }}
          >
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase
              placeholder="Search products..."
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>

          {/* Logo (you can replace with <img />) */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            🛍️
          </Typography>

          {/* Profile Avatar */}
          <Avatar alt="User Profile" src="/static/images/avatar/1.jpg"  sx={{ width: 28, height: 28 }} /> Profile
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
