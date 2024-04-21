import React from 'react';
import { render, screen } from '@testing-library/react';
import RepeatBlock from "./RepeatBlock";
import {Provider} from "react-redux";
import {store} from "../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("RepeatBlock Component", () => {
  test("Renders repeat block with the provided info", () => {
    const mockRepeatBlockData = {
      index: 0,
      type: "repeat",
      info: {
        times: "4",
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <RepeatBlock block={mockRepeatBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Repeat")).toBeInTheDocument();
    expect(screen.getByText("4 times")).toBeInTheDocument();
  });

  test("Renders repeat block with undefined info", () => {
    const mockRepeatBlockData = {
      index: 0,
      type: "repeat",
      info: undefined,
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <RepeatBlock block={mockRepeatBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Repeat")).toBeInTheDocument();
    expect(screen.getAllByText("-").length).toBe(1);
  });
});
