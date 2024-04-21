import React from 'react';
import { render, screen } from '@testing-library/react';
import OutputBlock from "./OutputBlock";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("OutputBlock Component", () => {
  test("Renders output block with the provided info", () => {
    const mockOutputBlockData = {
      index: 0,
      type: "output",
      info: {
        dropletId: "testId1",
        posX: "10",
        posY: "5",
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <OutputBlock block={mockOutputBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Output")).toBeInTheDocument();
    expect(screen.getByText("testId1")).toBeInTheDocument();
    expect(screen.getByText("(10,5)")).toBeInTheDocument();
  });

  test("Renders output block with undefined info", () => {
    const mockOutputBlockData = {
      index: 0,
      type: "output",
      info: undefined,
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <OutputBlock block={mockOutputBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Output")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBe(1);
    expect(screen.getByText("(-,-)")).toBeInTheDocument();
  });
});
