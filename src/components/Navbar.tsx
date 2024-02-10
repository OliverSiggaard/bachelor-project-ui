import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import {Save, PlayCircleFilled} from "@mui/icons-material";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ height: '64px' }}>
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Bachelor Project
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          color="inherit"
        >
          <Save />
        </IconButton>
        <IconButton
          size="large"
          color="inherit"
        >
          <PlayCircleFilled />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;