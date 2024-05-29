import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import InputBlockEditor from "./InputBlockEditor";
import {Block} from "../../../types/blockTypes";
import {act} from "react-dom/test-utils";

import '@testing-library/jest-dom/extend-expect';

const renderInputBlockEditorWithProviders = (store: any, block: Block) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <InputBlockEditor block={block} />
      </Provider>
    </DndProvider>
  );
}

describe("InputBlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render empty InputBlockEditor correctly", () => {
    const inputBlock = {index: 0, type: "input"};
    const store = mockStore({
      blocks: [
        inputBlock
      ],
      selectedIndex: 0
    });

    renderInputBlockEditorWithProviders(store, inputBlock);

    expect(screen.getByText("Input Block")).toBeInTheDocument();
    expect(screen.getByTestId("input-block-editor")).toBeInTheDocument();
  });
  test("Render InputBlockEditor with dropletId, position and volume correctly", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const store = mockStore({
      blocks: [
        inputBlock
      ],
      selectedIndex: 0
    });

    renderInputBlockEditorWithProviders(store, inputBlock);

    expect(screen.getByText("Input Block")).toBeInTheDocument();
    expect(screen.getByTestId("input-block-editor")).toBeInTheDocument();
    expect(screen.getByLabelText("Droplet ID")).toHaveValue("testDrop");
    expect(screen.getByLabelText("x-Pos")).toHaveValue("5");
    expect(screen.getByLabelText("y-Pos")).toHaveValue("8");
    expect(screen.getByLabelText("Volume (µl)")).toHaveValue("10");
  });
  test("Should dispatch editBlock and selectBlock actions correctly when save button is clicked", () => {
    const inputBlock = {index: 0, type: "input"};
    const store = mockStore({
      blocks: [
        inputBlock
      ],
      selectedIndex: 0
    });

    renderInputBlockEditorWithProviders(store, inputBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByLabelText("Droplet ID"), { target: { value: "testDrop" } });
      fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: 10 } });
      fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: 15 } });
      fireEvent.change(screen.getByLabelText("Volume (µl)"), { target: { value: 20 } });
      screen.getByText("Save").click();
    });

    expect(store.getActions()).toEqual([
      { type: "block/editBlock", payload: { index: 0, info: { dropletId: "testDrop", posX: "10", posY: "15", volume: "20" } } },
      { type: "block/selectBlock", payload: null }
    ]);
  });
  test("Should dispatch removeBlock action when delete button is clicked", () => {
    const inputBlock = {index: 0, type: "input"};
    const store = mockStore({
      blocks: [
        inputBlock
      ],
      selectedIndex: 0
    });

    renderInputBlockEditorWithProviders(store, inputBlock);

    fireEvent.click(screen.getByText("Delete"));

    expect(store.getActions()).toEqual([
      { type: "block/removeBlock", payload: 0 }
    ]);
  });
  test("Should show error message when droplet ID is not unique", () => {
    const inputBlock1 = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const inputBlock2 = {index: 1, type: "input"};
    const store = mockStore({
      blocks: [
        inputBlock1,
        inputBlock2
      ],
      selectedIndex: 1
    });

    renderInputBlockEditorWithProviders(store, inputBlock2);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByLabelText("Droplet ID"), { target: { value: "testDrop" } });
      fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: 4 } });
      fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: 6 } });
      fireEvent.change(screen.getByLabelText("Volume (µl)"), { target: { value: 15 } });
      screen.getByText("Save").click();
    });

    expect(screen.getByText("Droplet ID must be unique")).toBeInTheDocument();
  });
});