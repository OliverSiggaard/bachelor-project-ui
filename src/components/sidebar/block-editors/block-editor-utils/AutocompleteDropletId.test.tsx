import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {render, screen} from "@testing-library/react";
import AutocompleteDropletId from "./AutocompleteDropletId";
import '@testing-library/jest-dom/extend-expect';

describe("AutocompleteDropletId Component", () => {
  const mockStore = configureMockStore();
  const initialState = {
    blocks: [
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: "5"
        }
      },
      {
        index: 1,
        type: "input",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "20",
          volume: "7"
        }
      },
      {
        index: 2,
        type: "output",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
        }
      }
    ],
    selectedIndex: 0,
  };
  const store = mockStore(initialState);

  test("Should render with testId1", () => {
    const mockSetDropletId = jest.fn();
    const mockDropletId = "testId1";

    render(
      <Provider store={store}>
        <AutocompleteDropletId dropletId={mockDropletId} setDropletId={mockSetDropletId} />
      </Provider>
    );

    expect(screen.getByLabelText("Droplet ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Droplet ID")).toHaveValue("testId1");
  });
  test("Should render with no dropletId if the dropletId does not exist", () => {
    const mockSetDropletId = jest.fn();
    const mockDropletId = "testId1";
    const mockText = "Droplet ID";

    const store = mockStore({
      ...initialState,
      selectedIndex: 2
    });

    render(
      <Provider store={store}>
        <AutocompleteDropletId dropletId={mockDropletId} setDropletId={mockSetDropletId} text={mockText} />
      </Provider>
    );

    expect(screen.getByLabelText("Droplet ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Droplet ID")).toHaveValue("");
  });
  test("Should have Droplet ID as label if no custom label is provided", () => {
    const mockSetDropletId = jest.fn();
    const mockDropletId = "testId1";

    render(
      <Provider store={store}>
        <AutocompleteDropletId dropletId={mockDropletId} setDropletId={mockSetDropletId} />
      </Provider>
    );

    expect(screen.getByLabelText("Droplet ID")).toBeInTheDocument();
  });
  test("Should render with custom label if provided", () => {
    const mockSetDropletId = jest.fn();
    const mockDropletId = "testId1";
    const mockText = "Origin Droplet ID 1";

    render(
      <Provider store={store}>
        <AutocompleteDropletId dropletId={mockDropletId} setDropletId={mockSetDropletId} text={mockText} />
      </Provider>
    );

    expect(screen.getByLabelText("Origin Droplet ID 1")).toBeInTheDocument();
  });
});