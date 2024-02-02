import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';

function App() {

  const [helloString, setHelloString] = useState<string>('');

  const getHelloString = async () => {
    const response = await api.get("/root");
    setHelloString(response.data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getHelloString}>
          Press Me
        </button>
        {helloString}
      </header>
    </div>
  );
}

export default App;
