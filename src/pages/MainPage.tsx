import React, {useState} from 'react';
import {Button, Divider} from "@mui/material";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import BlockSidebar from "../components/BlockSidebar";
import CodeCanvas from "../components/CodeCanvas";
import zIndex from "@mui/material/styles/zIndex";

const MainPage: React.FC = () => {

  const [helloString, setHelloString] = useState<string>('');

  const getHelloString = async () => {
    try {
      const response = await api.get("/root");
      setHelloString(response.data);
    } catch (err) {
      setHelloString("Error connecting to Spring Boot - check if it is running")
    }
  }

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
          {/*
          <div className="flex flex-col w-full h-full items-center justify-center">
            <Button variant="contained" onClick={getHelloString}>Call Spring Boot</Button>
            {helloString}
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;