import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import StoreBlockEditor from "./StoreBlockEditor";
import {Block} from "../../../types/blockTypes";
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import '@testing-library/jest-dom/extend-expect';

const renderStoreBlockEditorWithProviders = (store: any, block: Block) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <StoreBlockEditor block={block} />
      </Provider>
    </DndProvider>
  );
}

describe("StoreBlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render empty StoreBlockEditor correctly", () => {
    const storeBlock = {index: 0, type: "store"};
    const store = mockStore({
      blocks: [
        storeBlock
      ],
      selectedIndex: 0
    });

    renderStoreBlockEditorWithProviders(store, storeBlock);

    expect(screen.getByText("Store Block")).toBeInTheDocument();
    expect(screen.getByTestId("store-block-editor")).toBeInTheDocument();
  });
  test("Render StoreBlockEditor with dropletId, position and ticks correctly", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const storeBlock = {index: 1, type: "store", info: {dropletId: "testDrop", posX: "7", posY: "6", time: "1000"}};
    const store = mockStore({
      blocks: [
        inputBlock,
        storeBlock
      ],
      selectedIndex: 1
    });

    renderStoreBlockEditorWithProviders(store, storeBlock);

    expect(screen.getByText("Store Block")).toBeInTheDocument();
    expect(screen.getByTestId("store-block-editor")).toBeInTheDocument();
    expect(screen.getByLabelText("Droplet ID")).toHaveValue("testDrop");
    expect(screen.getByLabelText("x-Pos")).toHaveValue("7");
    expect(screen.getByLabelText("y-Pos")).toHaveValue("6");
    expect(screen.getByLabelText("Ticks")).toHaveValue("1000");
  });
  test("Should dispatch editBlock and selectBlock actions correctly when save button is clicked", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const storeBlock = {index: 1, type: "store"};
    const store = mockStore({
      blocks: [
        inputBlock,
        storeBlock
      ],
      selectedIndex: 1
    });

    renderStoreBlockEditorWithProviders(store, storeBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByLabelText("Droplet ID"), "testDrop");
      userEvent.click(screen.getByText("testDrop"));
      fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: 7 } });
      fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: 6 } });
      fireEvent.change(screen.getByLabelText("Ticks"), { target: { value: 1000 } });
      screen.getByText("Save").click();
    });

    expect(store.getActions()).toEqual([
      { type: "block/editBlock", payload: { index: 1, info: { dropletId: "testDrop", posX: "7", posY: "6", time: "1000" } } },
      { type: "block/selectBlock", payload: null }
    ]);
  });
  test("Should dispatch removeBlock action when delete button is clicked", () => {
    const storeBlock = {index: 0, type: "store"};
    const store = mockStore({
      blocks: [
        storeBlock
      ],
      selectedIndex: 0
    });

    renderStoreBlockEditorWithProviders(store, storeBlock);

    fireEvent.click(screen.getByText("Delete"));

    expect(store.getActions()).toEqual([
      { type: "block/removeBlock", payload: 0 }
    ]);
  });
});