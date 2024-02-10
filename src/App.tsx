import React from 'react';
import MainPage from "./pages/MainPage";
import {ThemeProvider} from "@mui/material";
import {muiColorTheme} from "./MuiColorTheme";

function App() {
  return (
    <ThemeProvider theme={muiColorTheme}>
      <div>
        <MainPage/>
      </div>
    </ThemeProvider>
  );
}

export default App;
