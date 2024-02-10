import React from 'react';
import {Grid, IconButton} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";

interface ZoomControlProps {
  handleZoom: (type: string) => void;
}

const ZoomControls: React.FC<ZoomControlProps> = ({ handleZoom }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <IconButton size="large" onClick={() => handleZoom('in')}>
          <Add />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton size="large" onClick={() => handleZoom('out')}>
          <Remove />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ZoomControls;