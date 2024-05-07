import {fireEvent, render, screen} from "@testing-library/react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Provider} from "react-redux";
import React from "react";
import BlockEditor from "./BlockEditor";
import configureStore from "redux-mock-store";

import '@testing-library/jest-dom/extend-expect';

const renderBlockEditorWithRedux = (store: any) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <BlockEditor />
      </Provider>
    </DndProvider>
  );
};

describe("BlockEditor Component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  test("Renders without blocks and no selected, without crashing", () => {
    const store = mockStore({ blocks: [], selectedIndex: null });

    renderBlockEditorWithRedux(store);
  });
  test("Renders input block editor correctly", () => {
    const store = mockStore({ blocks: [{ type: 'input', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Input Block")).toBeInTheDocument();
    expect(screen.getByTestId("input-block-editor")).toBeInTheDocument();
  });
  test("Renders output block editor correctly", () => {
    const store = mockStore({ blocks: [{ type: 'output', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Output Block")).toBeInTheDocument();
    expect(screen.getByTestId("output-block-editor")).toBeInTheDocument();
  });
  test("Renders move block editor correctly", () => {
    const store = mockStore({ blocks: [{ type: 'move', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Move Block")).toBeInTheDocument();
    expect(screen.getByTestId("move-block-editor")).toBeInTheDocument();
  });
  test("Renders merge block editor correctly", () => {
    const store = mockStore({ blocks: [{ type: 'merge', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Merge Block")).toBeInTheDocument();
    expect(screen.getByTestId("merge-block-editor")).toBeInTheDocument();
  });
  test("Renders split block editor correctly", () => {
    const store = mockStore({ blocks: [{ type: 'split', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Split Block")).toBeInTheDocument();
    expect(screen.getByTestId("split-block-editor")).toBeInTheDocument();
  });
  test("Renders mix block editor correctly", () => {
    const store = mockStore({ blocks: [{ type: 'mix', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Mix Block")).toBeInTheDocument();
    expect(screen.getByTestId("mix-block-editor")).toBeInTheDocument();
  });
  test("Renders store block editor correctly", () => {
    const store = mockStore({ blocks: [{ type: 'store', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Store Block")).toBeInTheDocument();
    expect(screen.getByTestId("store-block-editor")).toBeInTheDocument();
  });
  test("Renders nothing when no block is selected", () => {
    const store = mockStore({ blocks: [{ type: 'input', index: 0 }], selectedIndex: null });

    renderBlockEditorWithRedux(store);

    expect(screen.queryByTestId("input-block-editor")).toBeNull();
    expect(screen.queryByTestId("output-block-editor")).toBeNull();
    expect(screen.queryByTestId("move-block-editor")).toBeNull();
    expect(screen.queryByTestId("merge-block-editor")).toBeNull();
    expect(screen.queryByTestId("split-block-editor")).toBeNull();
    expect(screen.queryByTestId("mix-block-editor")).toBeNull();
    expect(screen.queryByTestId("store-block-editor")).toBeNull();
  });
  test("Renders the block editor for the correct index", () => {
    const store = mockStore({ blocks: [{ type: 'input', index: 0 }, { type: 'output', index: 1 }], selectedIndex: 1 });

    renderBlockEditorWithRedux(store);

    expect(screen.getByText("Output Block")).toBeInTheDocument();
    expect(screen.getByTestId("output-block-editor")).toBeInTheDocument();
    expect(screen.queryByText("Input Block")).toBeNull();
    expect(screen.queryByTestId("input-block-editor")).toBeNull();
  });
  test("Does not render anything when block is of unknown type", () => {
    const store = mockStore({ blocks: [{ type: 'unknown', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    expect(screen.queryByText("unknown-block-editor")).toBeNull();
    expect(screen.queryByTestId("input-block-editor")).toBeNull();
    expect(screen.queryByTestId("output-block-editor")).toBeNull();
    expect(screen.queryByTestId("move-block-editor")).toBeNull();
    expect(screen.queryByTestId("merge-block-editor")).toBeNull();
    expect(screen.queryByTestId("split-block-editor")).toBeNull();
    expect(screen.queryByTestId("mix-block-editor")).toBeNull();
    expect(screen.queryByTestId("store-block-editor")).toBeNull();
  });
  test("Should de-select block when close button is clicked", async () => {
    const store = mockStore({ blocks: [{ type: 'input', index: 0 }], selectedIndex: 0 });

    renderBlockEditorWithRedux(store);

    fireEvent.click(screen.getByTestId("close-block-editor-button"));

    expect(store.getActions()).toEqual([{ type: 'block/selectBlock', payload: null }]);
  });
});