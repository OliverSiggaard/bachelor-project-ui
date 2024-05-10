import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import DeleteDialog from "./DeleteDialog";

import '@testing-library/jest-dom/extend-expect';

describe("DeleteDialog component", () => {
  const onCloseMock = jest.fn();
  const onDeleteMock = jest.fn();

  test("Should render deleteDialog component with correct content", () => {
    render(
      <DeleteDialog
        open={true}
        onClose={onCloseMock}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByText("Delete all blocks?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("Should call onClose when cancel button is clicked", () => {
    render(
      <DeleteDialog
        open={true}
        onClose={onCloseMock}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(screen.getByText("Cancel")); // Simulate click

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Should call onDelete and onClose when delete button is clicked", () => {
    render(
      <DeleteDialog
        open={true}
        onClose={onCloseMock}
        onDelete={onDeleteMock}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(onCloseMock).toHaveBeenCalled();
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
