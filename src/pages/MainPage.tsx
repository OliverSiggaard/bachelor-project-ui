import React from 'react';
import {Divider} from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import CodeCanvas from "../components/code-canvas/CodeCanvas";

const MainPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div style={{ zIndex: 2 }}>
        <Navbar />
      </div>
      <div className="flex flex-row" style={{height: "calc(100vh - 64px)"}}>
        <Sidebar />
        <Divider orientation="vertical" flexItem sx={{borderRightWidth: 3}}/>
        <div className="flex flex-col w-full">
          <CodeCanvas />
        </div>
      </div>
    </div>
  );
};

export default MainPage;