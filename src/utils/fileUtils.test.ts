import {downloadFile, getCompiledProgramFileName} from "./fileUtils";

describe("fileUtils", () => {
  describe("downloadFile", () => {
    let createObjectURLMock: jest.Mock;
    let revokeObjectURLMock: jest.Mock;
    let clickMock: jest.Mock;

    beforeEach(() => {
      createObjectURLMock = jest.fn();
      revokeObjectURLMock = jest.fn();
      clickMock = jest.fn();

      window.URL.createObjectURL = createObjectURLMock;
      window.URL.revokeObjectURL = revokeObjectURLMock;
      HTMLElement.prototype.click = clickMock;
    });

    afterEach(() => {
      createObjectURLMock.mockRestore();
      revokeObjectURLMock.mockRestore();
      clickMock.mockRestore();
    });

    test("Should initiate download of file with given filename", () => {
      downloadFile("sampleData", "sampleFile.basm");

      expect(createObjectURLMock).toHaveBeenCalled();
      expect(revokeObjectURLMock).toHaveBeenCalled();
      expect(clickMock).toHaveBeenCalled();
    });
  });

  describe("getCompiledProgramFileName", () => {
    let mockDate: any;
    let dateSpy: any;

    beforeEach(() => {
      mockDate = new Date("2024-04-07T08:16:24");
      dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);
    });

    afterEach(() => {
      dateSpy.mockRestore();
    });

    test("Should return a filename in the correct format with the current time", () => {
      const fileName = getCompiledProgramFileName();

      expect(fileName).toBe("compiled_program_081624.basm");
    });
  });
});