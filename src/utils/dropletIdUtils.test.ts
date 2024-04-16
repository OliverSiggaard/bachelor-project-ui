import { getAvailableDropletIdsForIndex } from "./dropletIdUtils";
import {Block} from "../types/blockTypes";

describe("dropletIdUtils", () => {
  test("Should return dropletId for input block at the next index", () => {
    const mockBlocks: Block[] = [
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
        type: "input",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "20",
          volume: "6"
        }
      }
    ];
    const mockIndex = 1;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual(["testId1"]);
  });
  test("Should remove dropletId for output block at the next index", () => {
    const mockBlocks: Block[] = [
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
          posX: "10",
          posY: "5",
        }
      },
      {
        index: 2,
        type: "input",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "20",
          volume: "6"
        }
      }
    ];
    const mockIndex = 2;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual([]);
  });
  test ("Should remove origin droplets and add result droplet for merge block at the next index", () => {
    const mockBlocks: Block[] = [
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
        type: "input",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "20",
          volume: "6"
        }
      },
      {
        index: 2,
        type: "merge",
        info: {
          originDropletId1: "testId1",
          originDropletId2: "testId2",
          resultDropletId: "testId3",
          posX: "10",
          posY: "10"
        }
      },
      {
        index: 3,
        type: "move",
        info: {
          dropletId: "testId3",
          posX: "10",
          posY: "10",
        }
      }
    ];
    const mockIndex = 3;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual(["testId3"]);
  });
  test("Should remove origin droplet and add result droplets for split block at the next index", () => {
    const mockBlocks: Block[] = [
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
        type: "split",
        info: {
          originDropletId: "testId1",
          resultDropletId1: "testId2",
          resultDropletId2: "testId3",
          ratio: "0.5",
          posX1: "10",
          posY1: "10",
          posX2: "20",
          posY2: "20"
        }
      },
      {
        index: 2,
        type: "move",
        info: {
          dropletId: "testId2",
          posX: "10",
          posY: "10",
        }
      }
    ];
    const mockIndex = 2;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual(["testId2", "testId3"]);
  });
  test ("Should skip blocks without info", () => {
    const mockBlocks: Block[] = [
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
        type: "split"
      },
      {
        index: 2,
        type: "output"
      },
      {
        index: 3,
        type: "move",
        info: {
          dropletId: "testId1",
          posX: "20",
          posY: "20"
        }
      }
    ];
    const mockIndex = 3;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual(["testId1"]);
  });
  test("Should return empty array if no blocks", () => {
    const mockBlocks: Block[] = [];
    const mockIndex = 0;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual([]);
  });
  test("Should return empty array if index is negative", () => {
    const mockBlocks: Block[] = [
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
    ];
    const mockIndex = -1;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual([]);
  });
  test("Should return empty array if index is out of bounds", () => {
    const mockBlocks: Block[] = [
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
    ];
    const mockIndex = 10;

    expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual([]);
  });
  test("Should handle series of blocks", () => {
    const mockBlocks: Block[] = [
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
        type: "input",
        info: {
          dropletId: "testId2",
          posX: "20",
          posY: "20",
          volume: "6"
        }
      },
      {
        index: 2,
        type: "merge",
        info: {
          originDropletId1: "testId1",
          originDropletId2: "testId2",
          resultDropletId: "testId3",
          posX: "10",
          posY: "10"
        }
      },
      {
        index: 3,
        type: "split",
        info: {
          originDropletId: "testId3",
          resultDropletId1: "testId4",
          resultDropletId2: "testId5",
          ratio: "0.5",
          posX1: "10",
          posY1: "10",
          posX2: "20",
          posY2: "20"
        }
      },
      {
        index: 4,
        type: "output",
        info: {
          dropletId: "testId4",
          posX: "10",
          posY: "10",
        }
      },
      {
        index: 5,
        type: "output",
        info: {
          dropletId: "testId5",
          posX: "20",
          posY: "20",
        }
      },
    ];
    expect(getAvailableDropletIdsForIndex(mockBlocks, 0)).toEqual([]);
    expect(getAvailableDropletIdsForIndex(mockBlocks, 1)).toEqual(["testId1"]);
    expect(getAvailableDropletIdsForIndex(mockBlocks, 2)).toEqual(["testId1", "testId2"]);
    expect(getAvailableDropletIdsForIndex(mockBlocks, 3)).toEqual(["testId3"]);
    expect(getAvailableDropletIdsForIndex(mockBlocks, 4)).toEqual(["testId4", "testId5"]);
    expect(getAvailableDropletIdsForIndex(mockBlocks, 5)).toEqual(["testId5"]);
  });
});