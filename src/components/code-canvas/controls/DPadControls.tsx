import React from 'react';
import {Grid, IconButton} from "@mui/material";
import {
  ArrowBackRounded,
  ArrowDownwardRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  CenterFocusWeakRounded
} from "@mui/icons-material";

interface DPadControlsProps {
  handleMove: (type: string) => void;
}

const DPadControls: React.FC<DPadControlsProps> = ({ handleMove }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <IconButton size="large" onClick={() => handleMove('up')}>
          <ArrowUpwardRounded />
        </IconButton>
      </Grid>
      <Grid container justifyContent="center">
        <IconButton size="large" onClick={() => handleMove('left')}>
          <ArrowBackRounded />
        </IconButton>
        <IconButton size="large" onClick={() => handleMove('center')}>
          <CenterFocusWeakRounded />
        </IconButton>
        <IconButton size="large" onClick={() => handleMove('right')}>
          <ArrowForwardRounded />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton size="large" onClick={() => handleMove('down')}>
          <ArrowDownwardRounded />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default DPadControls;