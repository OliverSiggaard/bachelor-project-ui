import React from 'react';
import { render, screen } from '@testing-library/react';
import StoreBlock from "./StoreBlock";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("StoreBlock Component", () => {
  test("Renders store block with the provided info", () => {
    const mockStoreBlockData = {
      index: 0,
      type: "store",
      info: {
        dropletId: "testId1",
        posX: "15",
        posY: "10",
        time: "50",
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <StoreBlock block={mockStoreBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Store")).toBeInTheDocument();
    expect(screen.getByText("testId1")).toBeInTheDocument();
    expect(screen.getByText("(15,10)")).toBeInTheDocument();
    expect(screen.getByText("50 ms")).toBeInTheDocument();
  });

  test("Renders store block with undefined info", () => {
    const mockStoreBlockData = {
      index: 0,
      type: "store",
      info: undefined,
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <StoreBlock block={mockStoreBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Store")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBe(2);
    expect(screen.getByText("(-,-)")).toBeInTheDocument();
  });
});
