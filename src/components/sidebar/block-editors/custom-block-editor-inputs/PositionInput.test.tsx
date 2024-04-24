import PositionInput from "./PositionInput";
import {fireEvent, render, screen} from "@testing-library/react";
import {store} from "../../../../redux/store";
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

describe("PositionInput Component", () => {
  let setPosX: jest.Mock;
  let setPosY: jest.Mock;

  beforeEach(() => {
    setPosX = jest.fn();
    setPosY = jest.fn();
  });

  test("Should render position input with initial values for x and y", () => {
    const mockPosX = "10";
    const mockPosY = "5";

    render(
      <Provider store={store}>
        <PositionInput posX={mockPosX} posY={mockPosY} setPosX={setPosX} setPosY={setPosY} />
      </Provider>
    );

    expect(screen.getByLabelText("x-Pos")).toHaveValue(mockPosX);
    expect(screen.getByLabelText("y-Pos")).toHaveValue(mockPosY);
  });

  test ("Should update pos x when valid input is entered", async () => {
    const mockPosX = "10";
    const mockPosY = "5";
    const mockNewPosX = "20";

    render(
      <Provider store={store}>
        <PositionInput posX={mockPosX} posY={mockPosY} setPosX={setPosX} setPosY={setPosY} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: mockNewPosX } });

    expect(setPosX).toHaveBeenCalledWith(mockNewPosX);
    expect(setPosY).not.toHaveBeenCalled();
  });

  test ("Should update pos y when valid input is entered", async () => {
    const mockPosX = "10";
    const mockPosY = "5";
    const mockNewPosY = "20";

    render(
      <Provider store={store}>
        <PositionInput posX={mockPosX} posY={mockPosY} setPosX={setPosX} setPosY={setPosY} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: mockNewPosY } });

    expect(setPosY).toHaveBeenCalledWith(mockNewPosY);
    expect(setPosX).not.toHaveBeenCalled();
  });

  test ("Should not update pos x when invalid input is entered", async () => {
    const mockPosX = "10";
    const mockPosY = "5";
    const mockNewPosX = "-10a";

    render(
      <Provider store={store}>
        <PositionInput posX={mockPosX} posY={mockPosY} setPosX={setPosX} setPosY={setPosY} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("x-Pos"), { target: { value: mockNewPosX } });

    expect(setPosX).not.toHaveBeenCalled();
    expect(setPosY).not.toHaveBeenCalled();
  });

  test("Should not update pos y when invalid input is entered", async () => {
    const mockPosX = "10";
    const mockPosY = "5";
    const mockNewPosY = "4b";

    render(
      <Provider store={store}>
        <PositionInput posX={mockPosX} posY={mockPosY} setPosX={setPosX} setPosY={setPosY} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("y-Pos"), { target: { value: mockNewPosY } });

    expect(setPosY).not.toHaveBeenCalled();
    expect(setPosX).not.toHaveBeenCalled();
  });
});