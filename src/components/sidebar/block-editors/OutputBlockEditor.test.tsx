import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import OutputBlockEditor from "./OutputBlockEditor";
import userEvent from "@testing-library/user-event";
import {Block} from "../../../types/blockTypes";
import {act} from "react-dom/test-utils";

import '@testing-library/jest-dom/extend-expect';

const renderOutputBlockEditorWithProviders = (store: any, block: Block) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <OutputBlockEditor block={block} />
      </Provider>
    </DndProvider>
  );
}

describe("OutputBlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render empty OutputBlockEditor correctly", () => {
    const outputBlock = {index: 0, type: "output"};
    const store = mockStore({
      blocks: [
        outputBlock
      ],
      selectedIndex: 0
    });

    renderOutputBlockEditorWithProviders(store, outputBlock);

    expect(screen.getByText("Output Block")).toBeInTheDocument();
    expect(screen.getByTestId("output-block-editor")).toBeInTheDocument();
  });
  test("Render OutputBlockEditor with dropletId and position correctly", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const outputBlock = {index: 1, type: "output", info: {dropletId: "testDrop", posX: "7", posY: "6"}};
    const store = mockStore({
      blocks: [
        inputBlock,
        outputBlock
      ],
      selectedIndex: 1
    });

    renderOutputBlockEditorWithProviders(store, outputBlock);

    expect(screen.getByText("Output Block")).toBeInTheDocument();
    expect(screen.getByTestId("output-block-editor")).toBeInTheDocument();
    expect(screen.getByLabelText("Droplet ID")).toHaveValue("testDrop");
    expect(screen.getByLabelText("x-Pos")).toHaveValue("7");
    expect(screen.getByLabelText("y-Pos")).toHaveValue("6");
  });
  test("Should dispatch editBlock and selectBlock actions correctly when save button is clicked", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const outputBlock = {index: 1, type: "output"};
    const store = mockStore({
      blocks: [
        inputBlock,
        outputBlock
      ],
      selectedIndex: 1
    });

    renderOutputBlockEditorWithProviders(store, outputBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByLabelText("Droplet ID"), "testDrop");
      userEvent.click(screen.getByText("testDrop"));
      fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: 10 } });
      fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: 15 } });
      screen.getByText("Save").click();
    });

    expect(store.getActions()).toEqual([
      { type: "block/editBlock", payload: { index: 1, info: { dropletId: "testDrop", posX: "10", posY: "15" } } },
      { type: "block/selectBlock", payload: null }
    ]);
  });
  test("Should dispatch removeBlock action when delete button is clicked", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const outputBlock = {index: 1, type: "output"};
    const store = mockStore({
      blocks: [
        inputBlock,
        outputBlock
      ],
      selectedIndex: 1
    });

    renderOutputBlockEditorWithProviders(store, outputBlock);

    fireEvent.click(screen.getByText("Delete"));

    expect(store.getActions()).toEqual([
      { type: "block/removeBlock", payload: 1 }
    ]);
  });
});