import React, {useState} from 'react';
import {Button, Divider} from "@mui/material";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import EmptyBlock from "../components/blocks/EmptyBlock";

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
      <Navbar />
      <div className="flex flex-row h-full">
        <div className="flex flex-col w-1/5 items-center justify-center">
          Here goes the blocks
        </div>
        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 3 }} />
        <div className="flex flex-col w-4/5 items-center justify-center">
          <Button variant="contained" onClick={getHelloString}>Call Spring Boot</Button>
          {helloString}
          <EmptyBlock />
        </div>
      </div>
    </div>
  );
};

export default MainPage;