import React, { useRef } from 'react';
import PanZoom from "react-easy-panzoom";
import ZoomControls from "./controls/ZoomControls";
import DPadControls from "./controls/DPadControls";
import EmptyBlock from "../blocks/EmptyBlock";

const CodeCanvas: React.FC = () => {
  // Reference to access the methods of the PanZoom component
  const panZoomRef = useRef<any>(null);

  const handleMove = (direction: string) => {
    const { moveBy, autoCenter } = panZoomRef.current;
    switch (direction) {
      case 'up':
        moveBy(0, 50);
        break;
      case 'down':
        moveBy(0, -50);
        break;
      case 'left':
        moveBy(50, 0);
        break;
      case 'right':
        moveBy(-50, 0);
        break;
      case 'center':
        autoCenter(0.7);
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
        disabled // Disables default pan and zoom (we use custom buttons)
        disableDoubleClickZoom
        className="w-full h-full"
        style={{ overflow: 'auto' }} // Show scrollbars when needed
      >
        <EmptyBlock />
      </PanZoom>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <ZoomControls handleZoom={handleZoom} />
      </div>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <DPadControls handleMove={handleMove} />
      </div>
    </div >
  );
};

export default CodeCanvas;
