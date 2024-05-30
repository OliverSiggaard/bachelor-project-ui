import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import MoveBlockEditor from "./MoveBlockEditor";
import {Block} from "../../../types/blockTypes";
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import '@testing-library/jest-dom/extend-expect';

const renderMoveBlock = (store: any, block: Block) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <MoveBlockEditor block={block} />
      </Provider>
    </DndProvider>
  );
}

describe("MoveBlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render empty MoveBlockEditor correctly", () => {
    const moveBlock = {index: 0, type: "move"};
    const store = mockStore({
      blocks: [
        moveBlock
      ],
      selectedIndex: 0
    });

    renderMoveBlock(store, moveBlock);

    expect(screen.getByText("Move Block")).toBeInTheDocument();
    expect(screen.getByTestId("move-block-editor")).toBeInTheDocument();
  });
  test("Render MoveBlockEditor with dropletId and position correctly", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const moveBlock = {index: 1, type: "move", info: {dropletId: "testDrop", posX: "7", posY: "6"}};
    const store = mockStore({
      blocks: [
        inputBlock,
        moveBlock
      ],
      selectedIndex: 1
    });

    renderMoveBlock(store, moveBlock);

    expect(screen.getByText("Move Block")).toBeInTheDocument();
    expect(screen.getByTestId("move-block-editor")).toBeInTheDocument();
    expect(screen.getByLabelText("Droplet ID")).toHaveValue("testDrop");
    expect(screen.getByLabelText("x-Pos")).toHaveValue("7");
    expect(screen.getByLabelText("y-Pos")).toHaveValue("6");
  });
  test("Should dispatch editBlock and selectBlock actions correctly when save button is clicked", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const moveBlock = {index: 1, type: "move"};
    const store = mockStore({
      blocks: [
        inputBlock,
        moveBlock
      ],
      selectedIndex: 1
    });

    renderMoveBlock(store, moveBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByLabelText("Droplet ID"), "testDrop");
      userEvent.click(screen.getByText("testDrop"));
      fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: 7 } });
      fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: 6 } });
      screen.getByText("Save").click();
    });

    expect(store.getActions()).toEqual([
      { type: "block/editBlock", payload: { index: 1, info: { dropletId: "testDrop", posX: "7", posY: "6" } } },
      { type: "block/selectBlock", payload: null }
    ]);
  });
  test("Should dispatch removeBlock action when delete button is clicked", () => {
    const moveBlock = {index: 0, type: "move"};
    const store = mockStore({
      blocks: [
        moveBlock
      ],
      selectedIndex: 0
    });

    renderMoveBlock(store, moveBlock);

    fireEvent.click(screen.getByText("Delete"));

    expect(store.getActions()).toEqual([
      { type: "block/removeBlock", payload: 0 }
    ]);
  });
});