import React from 'react';
import { render, screen } from '@testing-library/react';
import MoveBlock from "./MoveBlock";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("MoveBlock Component", () => {
  test("Renders move block with the provided info", () => {
    const mockMoveBlockData = {
      index: 0,
      type: "move",
      info: {
        dropletId: "testId1",
        posX: "15",
        posY: "10",
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MoveBlock block={mockMoveBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Move")).toBeInTheDocument();
    expect(screen.getByText("testId1")).toBeInTheDocument();
    expect(screen.getByText("(15,10)")).toBeInTheDocument();
  });

  test("Renders move block with undefined info", () => {
    const mockMoveBlockData = {
      index: 0,
      type: "move",
      info: undefined,
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MoveBlock block={mockMoveBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Move")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBe(1);
    expect(screen.getByText("(-,-)")).toBeInTheDocument();
  });
});
