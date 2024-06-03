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
          dropletId: "testId1",
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
          dropletId: "testId1",
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
  test("Should throw error if output block has invalid droplet ID", () => {
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
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 1 has an invalid droplet ID.");
  });
  test("Should throw error if merge block has invalid origin droplet IDs", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "merge",
        info: {
          originDropletId1: "testId1",
          originDropletId2: "testId2",
          resultDropletId: "testId3",
          posX: "10",
          posY: "5"
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 has an invalid droplet ID.");
  });
  test("Should throw error if split block has invalid origin droplet ID", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "split",
        info: {
          originDropletId: "testId1",
          resultDropletId1: "testId2",
          resultDropletId2: "testId3",
          posX1: "10",
          posY1: "5",
          posX2: "20",
          posY2: "5"
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).toThrow("Block 0 has an invalid droplet ID.");
  });
  test("Should not throw error if all blocks have valid info", () => {
    const blocks: Block[] = [
      {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "5",
          volume: "10"
        }
      },
      {
        index: 1,
        type: "split",
        info: {
          originDropletId: "testId1",
          resultDropletId1: "testId2",
          resultDropletId2: "testId3",
          posX1: "10",
          posY1: "5",
          posX2: "20",
          posY2: "5"
        }
      },
      {
        index: 2,
        type: "merge",
        info: {
          originDropletId1: "testId2",
          originDropletId2: "testId3",
          resultDropletId: "testId4",
          posX: "10",
          posY: "5"
        }
      },
      {
        index: 3,
        type: "output",
        info: {
          dropletId: "testId4",
          posX: "10",
          posY: "5",
        }
      }
    ];
    expect(() => checkReadyToCompile(blocks)).not.toThrow();
  });
});