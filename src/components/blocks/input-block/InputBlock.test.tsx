import React from 'react';
import { render, screen } from '@testing-library/react';
import InputBlock from './InputBlock';
import {Provider} from "react-redux";
import {store} from "../../../redux/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

describe("InputBlock Component", () => {
  test("Renders block with the provided info", () => {
    const mockInputBlockData = {
      index: 1,
      type: "input",
      info: {
        dropletId: "testId1",
        posX: "10",
        posY: "5",
        volume: "5"
      }
    };

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <InputBlock block={mockInputBlockData} />
        </Provider>
      </DndProvider>
    );

    expect(screen.getByText("Input")).toBeInTheDocument();
    expect(screen.getByText("testId1")).toBeInTheDocument();
    expect(screen.getByText("(10,5)")).toBeInTheDocument();
    expect(screen.getByText("5 µl")).toBeInTheDocument();
  });
});
