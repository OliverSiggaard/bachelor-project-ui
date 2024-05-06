import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeCanvas from './CodeCanvas';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import '@testing-library/jest-dom/extend-expect';

const renderCanvasWithProviders = (store: any) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <CodeCanvas />
      </Provider>
    </DndProvider>
  );
};

describe("CodeCanvas Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  test("Renders without blocks, without crashing", () => {
    const store = mockStore({ blocks: [] });

    renderCanvasWithProviders(store);
  });
  test("Renders base block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'base', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByTestId("block")).toBeInTheDocument();
  });
  test("Renders input block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'input', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Input")).toBeInTheDocument();
  });
  test("Renders output block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'output', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Output")).toBeInTheDocument();
  });
  test("Renders move block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'move', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Move")).toBeInTheDocument();
  });
  test("Renders merge block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'merge', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Merge")).toBeInTheDocument();
  });
  test("Renders split block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'split', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Split")).toBeInTheDocument();
  });
  test("Renders mix block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'mix', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Mix")).toBeInTheDocument();
  });
  test("Renders store block correctly", () => {
    const store = mockStore({ blocks: [{ type: 'store', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Store")).toBeInTheDocument();
  });
  test("Renders correct number of arrows", () => {
    const store = mockStore({ blocks: [{ type: 'input', index: 0 }, {type: 'move', index: 1}, { type: 'output', index: 2 }] });

    renderCanvasWithProviders(store);

    expect(screen.getAllByTestId("arrow")).toHaveLength(2);
  });
  test("Renders series of blocks", () => {
    const store = mockStore({ blocks: [{ type: 'input', index: 0 }, {type: 'move', index: 1}, { type: 'output', index: 2 }] });

    renderCanvasWithProviders(store);

    expect(screen.getByText("Input")).toBeInTheDocument();
    expect(screen.getByText("Move")).toBeInTheDocument();
    expect(screen.getByText("Output")).toBeInTheDocument();
    expect(screen.getAllByTestId("arrow")).toHaveLength(2);
    expect(screen.getAllByTestId("block")).toHaveLength(3);
  });
  test("Rendeer no blocks when block is of unknown type", () => {
    const store = mockStore({ blocks: [{ type: 'unknown', index: 0 }] });

    renderCanvasWithProviders(store);

    expect(screen.queryByTestId("block")).not.toBeInTheDocument();
  });
});
