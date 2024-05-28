import {checkReadyToCompile} from "./compileValidationUtils";
import {Block} from "../types/blockTypes";

describe("compileValidationUtils", () => {
  // Mock console.error before all tests to avoid throwing errors in test output
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {
    });
  });

  // Restore console.error after all tests to avoid affecting other test suites
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Should throw error message if no blocks", () => {
    const blocks: Block[] = [];
    expect(() => checkReadyToCompile(blocks)).toThrow("No blocks to compile.");
  });
  test("Should throw error message if block is missing info", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input"
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 is missing info.");
  });
  test("Should throw error message for correct block index if block is missing info", () => {
    const blocks: Block[] = [
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
        type: "output"
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 1 is missing info.");
  });
  test("Should throw error message if block info is missing field", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: ""
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 is missing info in field volume.");
  });
  test("Should throw error message for correct block index if block info is missing field", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: "5"
        },
      },
      {
        index: 1,
        type: "output",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "",
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 1 is missing info in field posY.");
  });
  test("Should not throw error message if all blocks have info", () => {
    const blocks: Block[] = [
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
        type: "output",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "10",
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).not.toThrow();
  });
  test("Should throw error message for the first of multiple blocks missing info", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input"
      },
      {
        index: 1,
        type: "output"
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 is missing info.");
  });
  test("Should throw error message for the first of multiple blocks missing info in field", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: ""
        }
      },
      {
        index: 1,
        type: "output",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "",
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 is missing info in field volume.");
  });
  test("Should throw error for first block missing info in field before second block missing info", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: ""
        }
      },
      {
        index: 1,
        type: "output"
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 is missing info in field volume.");
  });
  test("Should throw error for first block missing info before second block missing info in field", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input"
      },
      {
        index: 1,
        type: "output",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "",
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 is missing info.");
  });
});