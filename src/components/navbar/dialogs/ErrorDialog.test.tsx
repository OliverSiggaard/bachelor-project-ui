import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import ErrorDialog from "./ErrorDialog";

import '@testing-library/jest-dom/extend-expect';

describe("ErrorDialog component", () => {
  const onCloseMock = jest.fn();
  const onDownloadMock = jest.fn();

  test("Should render the ErrorDialog component with correct content", () => {
    render(
      <ErrorDialog
        open={true}
        onClose={onCloseMock}
        onDownload={onDownloadMock}
        allowPartialDownload={true}
        error={"Error message"}
      />
    );

    expect(screen.getByText("The following error occurred while compiling the program:")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Download Partial Program")).toBeInTheDocument();
  });

  test("Should call onClose when cancel button is clicked", () => {
    render(
      <ErrorDialog
        open={true}
        onClose={onCloseMock}
        onDownload={onDownloadMock}
        allowPartialDownload={true}
        error={"Error message"}
      />
    );

    fireEvent.click(screen.getByText("Cancel")); // Simulate click

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Should call onDownload and onClose when download partial program button is clicked", () => {
    render(
      <ErrorDialog
        open={true}
        onClose={onCloseMock}
        onDownload={onDownloadMock}
        allowPartialDownload={true}
        error={"Error message"}
      />
    );

    fireEvent.click(screen.getByText("Download Partial Program"));

    expect(onCloseMock).toHaveBeenCalled();
    expect(onDownloadMock).toHaveBeenCalled();
  });

  test("Download partial program button should be disabled when allowPartialDownload is false", () => {
    render(
      <ErrorDialog
        open={true}
        onClose={onCloseMock}
        onDownload={onDownloadMock}
        allowPartialDownload={false}
        error={"Error message"}
      />
    );

    fireEvent.click(screen.getByText("Download Partial Program"));

    expect(onCloseMock).not.toHaveBeenCalled();
    expect(onDownloadMock).not.toHaveBeenCalled();
  });
});
