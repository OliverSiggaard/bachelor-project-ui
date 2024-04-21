import React from 'react';
import { render, screen } from '@testing-library/react';
import MergeBlock from "./MergeBlock";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("MergeBlock Component", () => {
  test("Renders merge block with the provided info", () => {
    const mockMergeBlockData = {
      index: 0,
      type: "merge",
      info: {
        originDropletId1: "testId1",
        originDropletId2: "testId2",
        resultDropletId: "testId3",
        posX: "10",
        posY: "5",
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MergeBlock block={mockMergeBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Merge")).toBeInTheDocument();
    expect(screen.getByText("testId1")).toBeInTheDocument();
    expect(screen.getByText("testId2")).toBeInTheDocument();
    expect(screen.getByText("testId3")).toBeInTheDocument();
    expect(screen.getByText("(10,5)")).toBeInTheDocument();
  });

  test("Renders merge block with undefined info", () => {
    const mockMergeBlockData = {
      index: 0,
      type: "merge",
      info: undefined,
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <MergeBlock block={mockMergeBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Merge")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBe(3);
    expect(screen.getByText("(-,-)")).toBeInTheDocument();
  });
});
