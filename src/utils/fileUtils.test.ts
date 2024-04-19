import {downloadFile, getCompiledProgramFileName, getDmfConfigurationFileName} from "./fileUtils";

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

    test("Should initiate download of compiled program file", () => {
      downloadFile("sampleCompiledProgram", "sampleCompiledProgram.basm", "text-plain");

      expect(createObjectURLMock).toHaveBeenCalled();
      expect(revokeObjectURLMock).toHaveBeenCalled();
      expect(clickMock).toHaveBeenCalled();
    });

    test("Should initiate download of dmf configuration file", () => {
      downloadFile("sampleDmfConfiguration", "sampleDmfConfiguration.json", "application/json");

      expect(createObjectURLMock).toHaveBeenCalled();
      expect(revokeObjectURLMock).toHaveBeenCalled();
      expect(clickMock).toHaveBeenCalled();
    })

    test("Downloads both compiled program file and dmf configuration file", () => {
      downloadFile("sampleCompiledProgram", "sampleCompiledProgram.basm", "text-plain");
      downloadFile("sampleDmfConfiguration", "sampleDmfConfiguration.json", "application/json");

      expect(createObjectURLMock).toHaveBeenCalledTimes(2);
      expect(revokeObjectURLMock).toHaveBeenCalledTimes(2);
      expect(clickMock).toHaveBeenCalledTimes(2);
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

  describe("getDmfConfigurationFileName", () => {
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
      const fileName = getDmfConfigurationFileName();

      expect(fileName).toBe("dmf_configuration_081624.json");
    });
  });
});