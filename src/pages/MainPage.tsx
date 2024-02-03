import React, {useState} from 'react';
import {Button} from "@mui/material";
import api from "../api/axiosConfig";

const MainPage: React.FC = () => {

  const [helloString, setHelloString] = useState<string>('');

  const getHelloString = async () => {
    const response = await api.get("/root");
    setHelloString(response.data);
  }

  return (
    <div className="bg-zinc-200 h-screen flex flex-col justify-center items-center">
      <div>
        <Button variant="contained" onClick={getHelloString}>Call Spring Boot</Button>
      </div>
      <div>
        {helloString}
      </div>
    </div>
  );
};

export default MainPage;