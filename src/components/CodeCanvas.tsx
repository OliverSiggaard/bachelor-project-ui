import React, { useRef } from 'react';
import PanZoom from "react-easy-panzoom";
import {Button, Grid, Icon, IconButton} from "@mui/material";
import {
  ArrowBackRounded,
  ArrowDownwardRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  CenterFocusWeakRounded
} from "@mui/icons-material";

const CodeCanvas: React.FC = () => {
  const panZoomRef = useRef<any>(null); // Ref to access PanZoom component methods

  const handleMove = (direction: string) => {
    const { moveBy } = panZoomRef.current;
    switch (direction) {
      case 'up':
        moveBy(0, -50);
        break;
      case 'down':
        moveBy(0, 50);
        break;
      case 'left':
        moveBy(-50, 0);
        break;
      case 'right':
        moveBy(50, 0);
        break;
      case 'center':
        if (panZoomRef.current) {
          panZoomRef.current.reset();
        }
        break;
      default:
        break;
    }
  };

  const handleZoom = (type: string) => {
    const { zoomIn, zoomOut } = panZoomRef.current;
    switch (type) {
      case 'in':
        zoomIn();
        break;
      case 'out':
        zoomOut();
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full w-full relative">
      <PanZoom
        ref={panZoomRef}
        disabled
        className="w-full h-full"
        style={{overflow: 'auto' }}
      >
        <div style={{backgroundColor: "hotpink", width: '150px', height: '150px'}}/>
        <div style={{backgroundColor: "green", width: '150px', height: '150px'}}/>
        <div style={{backgroundColor: "beige", width: '150px', height: '150px'}}/>
        <div style={{backgroundColor: "blue", width: '150px', height: '150px'}}/>
        <div style={{backgroundColor: "black", width: '150px', height: '150px'}}/>
      </PanZoom>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <IconButton size="large" onClick={() => handleMove('up')}>
              <ArrowUpwardRounded />
            </IconButton>
          </Grid>
          <Grid container item justifyContent="center">
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
      </div>
      <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <button onClick={() => handleMove('up')}>Up</button>
        <br />
        <button onClick={() => handleMove('left')}>Left</button>
        <button onClick={() => handleMove('right')}>Right</button>
        <br />
        <button onClick={() => handleMove('down')}>Down</button>
        <br />
        <button onClick={() => handleZoom('in')}>Zoom In</button>
        <button onClick={() => handleZoom('out')}>Zoom Out</button>
        <br />
        <button onClick={() => handleMove('center')}>Center</button>
      </div>
    </div >
  );
};

export default CodeCanvas;
