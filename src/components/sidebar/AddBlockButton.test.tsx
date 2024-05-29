import AddBlockButton from "./AddBlockButton";
import {render, screen} from "@testing-library/react";
import {Input} from "@mui/icons-material";
import React from "react";

import '@testing-library/jest-dom/extend-expect';

describe("AddBlockButton Component", () => {
  test("Should render AddBlockButton with correct text and icon", () => {
    const color = "#FF0000";
    const text = "Test Button";
    const icon = <Input data-testid="input-icon" />;
    const onClick = jest.fn();

    render(
      <AddBlockButton color={color} icon={icon} text={text} onClick={onClick} />
    );

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId("input-icon")).toBeInTheDocument();
  });
  test("Should call onClick when button is clicked", () => {
    const onClick = jest.fn();

    render(
      <AddBlockButton color="#FF0000" icon={<Input />} text={"Test"} onClick={onClick} />
    );

    screen.getByText("Test").click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});