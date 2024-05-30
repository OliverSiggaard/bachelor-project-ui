import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import Sidebar from "./Sidebar";
import configureStore from "redux-mock-store";

import '@testing-library/jest-dom/extend-expect';

const renderSidebarWithProviders = (store: any) => {
  return render(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );
};

describe("Sidebar component", () => {
  const mockStore = configureStore([]); // Initialize mock Redux store

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render block buttons", () => {
    renderSidebarWithProviders(mockStore({blocks: []}));
    expect(screen.getByRole("button", {name: "Input Block"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Output Block"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Move Block"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Merge Block"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Split Block"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Mix Block"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Store Block"})).toBeInTheDocument();
  });

  test("Should dispatch addBlock action when block button is clicked", () => {
    const store = mockStore({blocks: []});
    renderSidebarWithProviders(store);
    const inputBlockButton = screen.getByRole("button", {name: "Input Block"});
    inputBlockButton.click();
    expect(store.getActions()).toEqual([{ type: 'block/addBlock', payload: {index: 0, type: "input"} }]);
  });
});