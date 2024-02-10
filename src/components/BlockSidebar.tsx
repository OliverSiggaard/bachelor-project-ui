import React, {useState} from 'react';
import EmptyBlock from "./blocks/EmptyBlock";
import api from "../api/axiosConfig";
import {Button} from "@mui/material";

const BlockSidebar: React.FC = () => {

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
    <div className="flex flex-col items-center justify-center" style={{width: "300px"}}>
      <EmptyBlock/>
      <div style={{ height: '40px' }} />
      <Button variant="contained" onClick={getHelloString}>Call Spring Boot</Button>
      <div style={{ textAlign: 'center' }}>
        {helloString}
      </div>
    </div>
  );
};

export default BlockSidebar;
