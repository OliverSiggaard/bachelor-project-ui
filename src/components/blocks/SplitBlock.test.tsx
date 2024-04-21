import React from 'react';
import { render, screen } from '@testing-library/react';
import SplitBlock from "./SplitBlock";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("SplitBlock Component", () => {
  test("Renders split block with the provided info", () => {
    const mockSplitBlockData = {
      index: 0,
      type: "split",
      info: {
        originDropletId: "testId1",
        resultDropletId1: "testId2",
        resultDropletId2: "testId3",
        ratio: "0.4",
        posX1: "5",
        posY1: "6",
        posX2: "15",
        posY2: "6",
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <SplitBlock block={mockSplitBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Split")).toBeInTheDocument();
    expect(screen.getByText("testId1")).toBeInTheDocument();
    expect(screen.getByText("testId2")).toBeInTheDocument();
    expect(screen.getByText("testId3")).toBeInTheDocument();
    expect(screen.getByText("0.4")).toBeInTheDocument();
    expect(screen.getByText("0.6")).toBeInTheDocument();
    expect(screen.getByText("(5,6)")).toBeInTheDocument();
    expect(screen.getByText("(15,6)")).toBeInTheDocument();
  });

  test("Renders split block with undefined info", () => {
    const mockSplitBlockData = {
      index: 0,
      type: "split",
      info: undefined,
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <SplitBlock block={mockSplitBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Split")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBe(5);
    expect(screen.getAllByText("(-,-)").length).toBe(2);
  });
});
