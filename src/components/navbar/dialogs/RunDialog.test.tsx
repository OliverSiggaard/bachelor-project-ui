import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render, screen} from '@testing-library/react';
import RunDialog from './RunDialog';

describe("RunDialog component", () => {
  const onCloseMock = jest.fn();
  const onRunMock = jest.fn();

  test("Should render runDialog component with correct content", () => {
    render(
      <RunDialog
        open={true}
        onClose={onCloseMock}
        onRun={onRunMock}
        loading={false}
      />
    );

    expect(screen.getByText("Download compiled program?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  test("Should call onClose when cancel button is clicked", () => {
    render(
      <RunDialog
        open={true}
        onClose={onCloseMock}
        onRun={onRunMock}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText("Cancel")); // Simulate click

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Should call onRun and onClose when download button is clicked", () => {
    render(
      <RunDialog
        open={true}
        onClose={onCloseMock}
        onRun={onRunMock}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText("Download"));

    expect(onCloseMock).toHaveBeenCalled();
    expect(onRunMock).toHaveBeenCalled();
  });
});
