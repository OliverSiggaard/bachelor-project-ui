import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import SplitBlockEditor from "./SplitBlockEditor";
import {Block} from "../../../types/blockTypes";
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import '@testing-library/jest-dom/extend-expect';

const renderSplitBlockEditor = (store: any, block: Block) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <SplitBlockEditor block={block} />
      </Provider>
    </DndProvider>
  );
}

describe("SplitBlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render empty SplitBlockEditor correctly", () => {
    const splitBlock = {index: 0, type: "split"};
    const store = mockStore({
      blocks: [
        splitBlock
      ],
      selectedIndex: 0
    });

    renderSplitBlockEditor(store, splitBlock);

    expect(screen.getByText("Split Block")).toBeInTheDocument();
    expect(screen.getByTestId("split-block-editor")).toBeInTheDocument();
  });
  test("Render SplitBlockEditor with origin droplet ID, result droplet IDs and positions correctly", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const splitBlock = {index: 1, type: "split", info: {originDropletId: "testDrop1", resultDropletId1: "testDrop2", resultDropletId2: "testDrop3", posX1: "7", posY1: "6", posX2: "15", posY2: "9"}};
    const store = mockStore({
      blocks: [
        inputBlock,
        splitBlock
      ],
      selectedIndex: 1
    });

    renderSplitBlockEditor(store, splitBlock);

    expect(screen.getByText("Split Block")).toBeInTheDocument();
    expect(screen.getByTestId("split-block-editor")).toBeInTheDocument();
    expect(screen.getByLabelText("Origin Droplet ID")).toHaveValue("testDrop1");
    expect(screen.getByLabelText("Result Droplet 1 ID")).toHaveValue("testDrop2");
    expect(screen.getByLabelText("Result Droplet 2 ID")).toHaveValue("testDrop3");
    expect(screen.getByLabelText("x-Pos 1")).toHaveValue("7");
    expect(screen.getByLabelText("y-Pos 1")).toHaveValue("6");
    expect(screen.getByLabelText("x-Pos 2")).toHaveValue("15");
    expect(screen.getByLabelText("y-Pos 2")).toHaveValue("9");
  });
  test("Should dispatch editBlock and selectBlock actions correctly when save button is clicked", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const splitBlock = {index: 1, type: "split"};
    const store = mockStore({
      blocks: [
        inputBlock,
        splitBlock
      ],
      selectedIndex: 1
    });

    renderSplitBlockEditor(store, splitBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByLabelText("Origin Droplet ID"), "testDrop1");
      userEvent.click(screen.getByText("testDrop1"));
      fireEvent.change(screen.getByLabelText("Result Droplet 1 ID"), { target: { value: "testDrop2" } });
      fireEvent.change(screen.getByLabelText("Result Droplet 2 ID"), { target: { value: "testDrop3" } });
      fireEvent.change(screen.getByLabelText("x-Pos 1"), { target: { value: 7 } });
      fireEvent.change(screen.getByLabelText("y-Pos 1"), { target: { value: 6 } });
      fireEvent.change(screen.getByLabelText("x-Pos 2"), { target: { value: 15 } });
      fireEvent.change(screen.getByLabelText("y-Pos 2"), { target: { value: 9 } });
      screen.getByText("Save").click();
    });

    expect(store.getActions()).toEqual([
      { type: "block/editBlock", payload: { index: 1, info: { originDropletId: "testDrop1", resultDropletId1: "testDrop2", resultDropletId2: "testDrop3", posX1: "7", posY1: "6", posX2: "15", posY2: "9" } } },
      { type: "block/selectBlock", payload: null }
    ]);
  });
  test("Should dispatch removeBlock action when delete button is clicked", () => {
    const splitBlock = {index: 0, type: "split"};
    const store = mockStore({
      blocks: [
        splitBlock
      ],
      selectedIndex: 0
    });

    renderSplitBlockEditor(store, splitBlock);

    fireEvent.click(screen.getByText("Delete"));

    expect(store.getActions()).toEqual([
      { type: "block/removeBlock", payload: 0 }
    ]);
  });
  test("Should show error message when result droplet IDs are the same", () => {
    const splitBlock = {index: 0, type: "split"};
    const store = mockStore({
      blocks: [
        splitBlock
      ],
      selectedIndex: 0
    });

    renderSplitBlockEditor(store, splitBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByLabelText("Result Droplet 1 ID"), { target: { value: "testDrop1" } });
      fireEvent.change(screen.getByLabelText("Result Droplet 2 ID"), { target: { value: "testDrop1" } });
      screen.getByText("Save").click();
    });

    expect(screen.getAllByText("Droplet ID must be unique")).toHaveLength(2);
  });
  test("Should show error message when result droplet 1 ID already exists", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const splitBlock = {index: 1, type: "split"};
    const store = mockStore({
      blocks: [
        inputBlock,
        splitBlock
      ],
      selectedIndex: 1
    });

    renderSplitBlockEditor(store, splitBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByLabelText("Result Droplet 1 ID"), { target: { value: "testDrop1" } });
      screen.getByText("Save").click();
    });

    expect(screen.getAllByText("Droplet ID must be unique")).toHaveLength(1);
  });
  test("Should show error message when result droplet 2 ID already exists", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const splitBlock = {index: 1, type: "split"};
    const store = mockStore({
      blocks: [
        inputBlock,
        splitBlock
      ],
      selectedIndex: 1
    });

    renderSplitBlockEditor(store, splitBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByLabelText("Result Droplet 2 ID"), { target: { value: "testDrop1" } });
      screen.getByText("Save").click();
    });

    expect(screen.getAllByText("Droplet ID must be unique")).toHaveLength(1);
  });
  test("Should show exactly one error message if only one result droplet ID is not unique", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop1", posX: "5", posY: "8", volume: "10"}};
    const splitBlock = {index: 1, type: "split"};
    const store = mockStore({
      blocks: [
        inputBlock,
        splitBlock
      ],
      selectedIndex: 1
    });

    renderSplitBlockEditor(store, splitBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      fireEvent.change(screen.getByLabelText("Result Droplet 1 ID"), { target: { value: "testDrop1" } });
      fireEvent.change(screen.getByLabelText("Result Droplet 2 ID"), { target: { value: "testDrop2" } });
      screen.getByText("Save").click();
    });

    expect(screen.getAllByText("Droplet ID must be unique")).toHaveLength(1);
  });
});