import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import configureStore from "redux-mock-store";
import MixBlockEditor from "./MixBlockEditor";
import {Block} from "../../../types/blockTypes";
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import '@testing-library/jest-dom/extend-expect';

const renderMixBlockEditorWithProviders = (store: any, block: Block) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <MixBlockEditor block={block} />
      </Provider>
    </DndProvider>
  );
}

describe("MixBlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Render empty MixBlockEditor correctly", () => {
    const mixBlock = {index: 0, type: "mix"};
    const store = mockStore({
      blocks: [
        mixBlock
      ],
      selectedIndex: 0
    });

    renderMixBlockEditorWithProviders(store, mixBlock);

    expect(screen.getByText("Mix Block")).toBeInTheDocument();
    expect(screen.getByTestId("mix-block-editor")).toBeInTheDocument();
  });
  test("Render MixBlockEditor with dropletId, position and size correctly", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const mixBlock = {index: 1, type: "mix", info: {dropletId: "testDrop", posX: "7", posY: "6", xSize: "4", ySize: "5"}};
    const store = mockStore({
      blocks: [
        inputBlock,
        mixBlock
      ],
      selectedIndex: 1
    });

    renderMixBlockEditorWithProviders(store, mixBlock);

    expect(screen.getByText("Mix Block")).toBeInTheDocument();
    expect(screen.getByTestId("mix-block-editor")).toBeInTheDocument();
    expect(screen.getByLabelText("Droplet ID")).toHaveValue("testDrop");
    expect(screen.getByLabelText("x-Pos")).toHaveValue("7");
    expect(screen.getByLabelText("y-Pos")).toHaveValue("6");
    expect(screen.getByLabelText("x-Size")).toHaveValue("4");
    expect(screen.getByLabelText("y-Size")).toHaveValue("5");
  });
  test("Should dispatch editBlock and selectBlock actions correctly when save button is clicked", () => {
    const inputBlock = {index: 0, type: "input", info: {dropletId: "testDrop", posX: "5", posY: "8", volume: "10"}};
    const mixBlock = {index: 1, type: "mix"};
    const store = mockStore({
      blocks: [
        inputBlock,
        mixBlock
      ],
      selectedIndex: 1
    });

    renderMixBlockEditorWithProviders(store, mixBlock);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(screen.getByLabelText("Droplet ID"), "testDrop");
      userEvent.click(screen.getByText("testDrop"));
      fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: 7 } });
      fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: 6 } });
      fireEvent.change(screen.getByLabelText("x-Size"), { target: { value: 4 } });
      fireEvent.change(screen.getByLabelText("y-Size"), { target: { value: 5 } });
      screen.getByText("Save").click();
    });

    expect(store.getActions()).toEqual([
      { type: "block/editBlock", payload: { index: 1, info: { dropletId: "testDrop", posX: "7", posY: "6", xSize: "4", ySize: "5" } } },
      { type: "block/selectBlock", payload: null }
    ]);
  });
  test("Should dispatch removeBlock action when delete button is clicked", () => {
    const mixBlock = {index: 0, type: "mix"};
    const store = mockStore({
      blocks: [
        mixBlock
      ],
      selectedIndex: 0
    });

    renderMixBlockEditorWithProviders(store, mixBlock);

    fireEvent.click(screen.getByText("Delete"));

    expect(store.getActions()).toEqual([
      { type: "block/removeBlock", payload: 0 }
    ]);
  });
});