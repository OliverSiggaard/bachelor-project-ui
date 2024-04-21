import React from 'react';
import { render, screen } from '@testing-library/react';
import MixBlock from "./MixBlock";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("MixBlock Component", () => {
  test("Renders mix block with the provided info", () => {
    const mockMixBlockData = {
      index: 0,
      type: "mix",
      info: {
        dropletId: "testId1",
        posX: "15",
        posY: "10",
        xSize: "5",
        ySize: "6",
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MixBlock block={mockMixBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Mix")).toBeInTheDocument();
    expect(screen.getByText("testId1")).toBeInTheDocument();
    expect(screen.getByText("(15,10)")).toBeInTheDocument();
    expect(screen.getByText("5 x 6")).toBeInTheDocument();
  });

  test("Renders mix block with undefined info", () => {
    const mockMixBlockData = {
      index: 0,
      type: "mix",
      info: undefined,
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MixBlock block={mockMixBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Mix")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBe(1);
    expect(screen.getByText("(-,-)")).toBeInTheDocument();
    expect(screen.getByText("- x -")).toBeInTheDocument();
  });
});
