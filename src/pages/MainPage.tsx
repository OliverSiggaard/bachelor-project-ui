import React from 'react';
import {Divider} from "@mui/material";
import Navbar from "../components/Navbar";
import BlockSidebar from "../components/BlockSidebar";
import CodeCanvas from "../components/code-canvas/CodeCanvas";

const MainPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <div style={{ zIndex: 2 }}>
        <Navbar />
      </div>
      <div className="flex flex-row">
        <BlockSidebar/>
        <Divider orientation="vertical" flexItem sx={{borderRightWidth: 3}}/>
        <div className="flex flex-col w-full" style={{ height: 'calc(100vh - 64px)'}}>
          <CodeCanvas/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;