import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Navbar from "./Navbar";

import '@testing-library/jest-dom/extend-expect';

const renderNavbarWithProviders = (store: any) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </DndProvider>
  );
};

describe("Navbar Component correctly", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render navbar correctly", () => {
    const store = mockStore({blocks: []});

    renderNavbarWithProviders(store);

    expect(screen.getByText("DMF-Programmer")).toBeInTheDocument();
    expect(screen.getByTestId("delete-all-button")).toBeInTheDocument();
    expect(screen.getByTestId("download-button")).toBeInTheDocument();
    expect(screen.getByTestId("more-button")).toBeInTheDocument();
  });
  test("Should open delete dialog when delete all button is clicked", () => {
    const store = mockStore({blocks: []});

    renderNavbarWithProviders(store);

    fireEvent.click(screen.getByTestId("delete-all-button"));

    expect(screen.getByText("Delete all blocks?")).toBeInTheDocument();
  });
  test("Should open download dialog when download button is clicked", () => {
    const store = mockStore({blocks: []});

    renderNavbarWithProviders(store);

    fireEvent.click(screen.getByTestId("download-button"));

    expect(screen.getByText("Download compiled program?")).toBeInTheDocument();
  });
  test("Should open dropdown menu when more button is clicked", () => {
    const store = mockStore({blocks: []});

    renderNavbarWithProviders(store);

    fireEvent.click(screen.getByTestId("more-button"));

    expect(screen.getByText("Upload Program Sketch")).toBeInTheDocument();
    expect(screen.getByText("Download Program Sketch")).toBeInTheDocument();
  });
});