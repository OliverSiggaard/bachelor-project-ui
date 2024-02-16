import React from 'react';
import MainPage from "./pages/MainPage";
import {ThemeProvider} from "@mui/material";
import {muiColorTheme} from "./muiColorTheme";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={muiColorTheme}>
          <DndProvider backend={HTML5Backend}>
            <MainPage/>
          </DndProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
