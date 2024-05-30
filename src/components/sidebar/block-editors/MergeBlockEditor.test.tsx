import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import MergeBlockEditor from "./MergeBlockEditor";
import {Block} from "../../../types/blockTypes";
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import '@testing-library/jest-dom/extend-expect';

const renderMergeBlockEditorWithProviders = (store: any, block: Block) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <MergeBlockEditor block={block} />
      </Provider>
    </DndProvider>
  );
}

describe("MergeBlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render empty MergeBlockEditor correctly", () => {
    const mergeBlock = {index: 0, type: "merge"};
    const store = mockStore({
      blocks: [
        mergeBlock
      ],
      selectedIndex: 0
    });

    renderMergeBlockEditorWithProviders(store, mergeBlock);

    expect(screen.getByText("Merge Block")).toBeInTheDocument();
    expect(screen.getByTestId("merge-block-editor")).toBeInTheDocument();
  });
  test("Render MergeBlockEditor with origin droplet IDs, result droplet ID and position correctly", () => {
    const inputBlock1 = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const inputBlock2 = {index: 1, type: "input", info: {dropletId: "testDrop2", posX: "6", posY: "9", volume: "15"}};
    const mergeBlock = {index: 2, type: "merge", info: {originDropletId1: "testDrop1", originDropletId2: "testDrop2", resultDropletId: "testDrop3", posX: "7", posY: "10"}};
    const store = mockStore({
      blocks: [
        inputBlock1,
        inputBlock2,
        mergeBlock
      ],
      selectedIndex: 2
    });

    renderMergeBlockEditorWithProviders(store, mergeBlock);

    expect(screen.getByText("Merge Block")).toBeInTheDocument();
    expect(screen.getByTestId("merge-block-editor")).toBeInTheDocument();
    expect(screen.getByLabelText("Origin Droplet 1 ID")).toHaveValue("testDrop1");
    expect(screen.getByLabelText("Origin Droplet 2 ID")).toHaveValue("testDrop2");
    expect(screen.getByLabelText("Result Droplet ID")).toHaveValue("testDrop3");
    expect(screen.getByLabelText("x-Pos")).toHaveValue("7");
    expect(screen.getByLabelText("y-Pos")).toHaveValue("10");
  });
  test("Should dispatch editBlock and selectBlock actions correctly when save button is clicked", () => {
    const inputBlock1 = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const inputBlock2 = {index: 1, type: "input", info: {dropletId: "testDrop2", posX: "6", posY: "9", volume: "15"}};
    const mergeBlock = {index: 2, type: "merge"};
    const store = mockStore({
      blocks: [
        inputBlock1,
        inputBlock2,
        mergeBlock
      ],
      selectedIndex: 2
    });

    renderMergeBlockEditorWithProviders(store, mergeBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByLabelText("Origin Droplet 1 ID"), "testDrop1");
      userEvent.click(screen.getByText("testDrop1"));
      userEvent.type(screen.getByLabelText("Origin Droplet 2 ID"), "testDrop2");
      userEvent.click(screen.getByText("testDrop2"));
      fireEvent.change(screen.getByLabelText("Result Droplet ID"), { target: { value: "testDrop3" } });
      fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: 7 } });
      fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: 10 } });
      screen.getByText("Save").click();
    });

    expect(store.getActions()).toEqual([
      { type: "block/editBlock", payload: { index: 2, info: { originDropletId1: "testDrop1", originDropletId2: "testDrop2", resultDropletId: "testDrop3", posX: "7", posY: "10" } } },
      { type: "block/selectBlock", payload: null }
    ]);
  });
  test("Should dispatch removeBlock action when delete button is clicked", () => {
    const mergeBlock = {index: 0, type: "merge"};
    const store = mockStore({
      blocks: [
        mergeBlock
      ],
      selectedIndex: 0
    });

    renderMergeBlockEditorWithProviders(store, mergeBlock);

    fireEvent.click(screen.getByText("Delete"));

    expect(store.getActions()).toEqual([
      { type: "block/removeBlock", payload: 0 }
    ]);
  });
  test("Should show error message when result droplet ID is not unique", () => {
    const inputBlock1 = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const inputBlock2 = {index: 1, type: "input", info: {dropletId: "testDrop2", posX: "6", posY: "9", volume: "15"}};
    const mergeBlock = {index: 2, type: "merge"};
    const store = mockStore({
      blocks: [
        inputBlock1,
        inputBlock2,
        mergeBlock
      ],
      selectedIndex: 2
    });

    renderMergeBlockEditorWithProviders(store, mergeBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByLabelText("Result Droplet ID"), { target: { value: "testDrop1" } });
      screen.getByText("Save").click();
    });

    expect(screen.getByText("Droplet ID must be unique")).toBeInTheDocument();
  });
});