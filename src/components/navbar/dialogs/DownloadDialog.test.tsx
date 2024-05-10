import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import DownloadDialog from './DownloadDialog';

import '@testing-library/jest-dom/extend-expect';

describe("DownloadDialog component", () => {
  const onCloseMock = jest.fn();
  const onDownloadMock = jest.fn();

  test("Should render downloadDialog component with correct content", () => {
    render(
      <DownloadDialog
        open={true}
        onClose={onCloseMock}
        onDownload={onDownloadMock}
        loading={false}
      />
    );

    expect(screen.getByText("Download compiled program?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  test("Should call onClose when cancel button is clicked", () => {
    render(
      <DownloadDialog
        open={true}
        onClose={onCloseMock}
        onDownload={onDownloadMock}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText("Cancel")); // Simulate click

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("Should call onRun and onClose when download button is clicked", () => {
    render(
      <DownloadDialog
        open={true}
        onClose={onCloseMock}
        onDownload={onDownloadMock}
        loading={false}
      />
    );

    fireEvent.click(screen.getByText("Download"));

    expect(onCloseMock).toHaveBeenCalled();
    expect(onDownloadMock).toHaveBeenCalled();
  });
});
