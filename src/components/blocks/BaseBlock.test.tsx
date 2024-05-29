import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import BaseBlock from "./BaseBlock";
import {HTML5Backend} from "react-dnd-html5-backend";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";

import '@testing-library/jest-dom/extend-expect';

const renderBaseBlockWithProviders = (store: any, mockChildren: any) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <BaseBlock index={0} color="#FF0000">
          {mockChildren}
        </BaseBlock>
      </Provider>
    </DndProvider>
  );
};

describe("BaseBlock Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renders children correctly", () => {
    const store = mockStore({blocks: []});
    const mockChildren = <div data-testid="mock-children">Mock Children</div>;

    renderBaseBlockWithProviders(store, mockChildren);

    expect(screen.getByTestId("mock-children")).toBeInTheDocument();
  });
  test("Dispatches selectBlock action when clicked", () => {
    const store = mockStore({blocks: []});
    const mockChildren = <div data-testid="mock-children">Mock Children</div>;

    renderBaseBlockWithProviders(store, mockChildren);

    screen.getByTestId("block").click();

    expect(store.getActions()).toEqual([{ type: 'block/selectBlock', payload: 0 }]);
  });
  test("Dispatches selectBlock action when dragged", () => {
    const store = mockStore({blocks: []});
    const mockChildren = <div data-testid="mock-children">Mock Children</div>;

    renderBaseBlockWithProviders(store, mockChildren);

    fireEvent.dragStart(screen.getByTestId("block"));

    expect(store.getActions()).toEqual([{ type: 'block/selectBlock', payload: 0 }]);
  });
  test("Dispatches moveBlock action when one block is dragged and hovered over another", () => {
    const store = mockStore({blocks: [{index: 0, color: '#FF0000'}, {index: 1, color: '#00FF00'}]});
    const mockChildren = <div data-testid="mock-children">Mock Children</div>;

    render(
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <BaseBlock index={0} color="#FF0000">{mockChildren}</BaseBlock>
          <BaseBlock index={1} color="#00FF00">{mockChildren}</BaseBlock>
        </Provider>
      </DndProvider>
    );

    // Drag and hover the first block over the second block
    fireEvent.dragStart(screen.getAllByTestId("block")[0]);
    fireEvent.dragEnter(screen.getAllByTestId("block")[1]);


    expect(store.getActions()).toContainEqual({ type: 'block/moveBlock', payload: {dragIndex: 0, hoverIndex: 1} });
  });
});