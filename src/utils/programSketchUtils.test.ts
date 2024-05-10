import {validateUploadedBlocks} from "./programSketchUtils";

describe("programSketchUtils", () => {
  // Mock console.error before all tests to avoid throwing errors in test output
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Restore console.error after all tests to avoid affecting other test suites
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Should return true for valid blocks", () => {
    const blocks = JSON.stringify([
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: "5"
        }
      }
    ]);

    expect(validateUploadedBlocks(blocks)).toBe(true);
  });
  test("Should throw error message for invalid block type", () => {
    const blocks = JSON.stringify([
      {
        index: 0,
        type: "unknownType",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: "5"
        }
      }
    ]);

    expect(validateUploadedBlocks(blocks)).toBe("Invalid block type found in uploaded program sketch: unknownType");
  });
  test("Should throw error message for invalid block info", () => {
    const blocks = JSON.stringify([
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: "5",
          extraInfo: "extra"
        }
      }
    ]);

    expect(validateUploadedBlocks(blocks)).toBe("Invalid input block info found in uploaded program sketch: {\"dropletId\":\"testId1\",\"posX\":\"10\",\"posY\":\"5\",\"volume\":\"5\",\"extraInfo\":\"extra\"}");
  });
  test("Should react to invalid block type before invalid block info", () => {
    const blocks = JSON.stringify([
      {
        index: 0,
        type: "unknownType",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: "5",
          extraInfo: "extra"
        }
      }
    ]);

    expect(validateUploadedBlocks(blocks)).toBe("Invalid block type found in uploaded program sketch: unknownType");
  });
  test("Should return early with no error message for empty block info", () => {
    const blocks = JSON.stringify([
      {
        index: 0,
        type: "input"
      }
    ]);

    expect(validateUploadedBlocks(blocks)).toBe(true);
  });
});