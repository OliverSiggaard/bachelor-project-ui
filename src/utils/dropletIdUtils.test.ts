import {
  getAvailableDropletIdsForIndex,
  removeDropletId,
  removeDropletIdFromBlockInfo,
  removeDropletIdsIfNecessary
} from "./dropletIdUtils";
import {
  Block,
  MergeBlockInfo,
  MixBlockInfo,
  MoveBlockInfo,
  OutputBlockInfo,
  SplitBlockInfo,
  StoreBlockInfo
} from "../types/blockTypes";

describe("dropletIdUtils", () => {
  describe("getAvailableDropletIdsForIndex", () => {
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
    test("Should remove origin droplets and add result droplet for merge block at the next index", () => {
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
    test("Should skip blocks without info", () => {
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
    test("Should not add empty dropletId - InputBlock", () => {
      const mockBlocks: Block[] = [
        {
          index: 0,
          type: "input",
          info: {
            dropletId: "",
            posX: "10",
            posY: "5",
            volume: "5"
          }
        },
        {
          index: 1,
          type: "move",
          info: {
            dropletId: "",
            posX: "20",
            posY: "20",
          }
        }
      ];
      const mockIndex = 1;

      expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual([]);
    });
    test("Should not add empty dropletId - MergeBlock", () => {
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
            resultDropletId: "",
            posX: "10",
            posY: "10"
          }
        },
        {
          index: 3,
          type: "move",
          info: {
            dropletId: "",
            posX: "10",
            posY: "10",
          }
        }
      ];
      const mockIndex = 3;

      expect(getAvailableDropletIdsForIndex(mockBlocks, mockIndex)).toEqual([]);
    });
    test("Should not add empty dropletIds - SplitBlock", () => {
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
            resultDropletId1: "",
            resultDropletId2: "",
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
            dropletId: "",
            posX: "10",
            posY: "10",
          }
        }
      ];

      const mockIndex = 2;

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

  describe("removeDropletId", () => {
    test("Should remove dropletId for input block", () => {
      const blockToRemove: Block = {
        index: 0,
        type: "input",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
          volume: "5"
        }
      };
      const mockBlock: Block = {
        index: 1,
        type: "move",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
        }
      };

      const updatedBlock = removeDropletId(mockBlock, blockToRemove);

      expect((updatedBlock.info as MoveBlockInfo).dropletId).toBe("");
    });
    test("Should remove resultDropletId for merge block", () => {
      const blockToRemove: Block = {
        index: 0,
        type: "merge",
        info: {
          originDropletId1: "testId1",
          originDropletId2: "testId2",
          resultDropletId: "testId3",
          posX: "10",
          posY: "10"
        }
      };
      const mockBlock: Block = {
        index: 1,
        type: "move",
        info: {
          dropletId: "testId3",
          posX: "10",
          posY: "10",
        }
      };

      const updatedBlock = removeDropletId(mockBlock, blockToRemove);

      expect((updatedBlock.info as MoveBlockInfo).dropletId).toBe("");
    });

    test("Should remove resultDropletIds for split block", () => {
      const blockToRemove: Block = {
        index: 0,
        type: "split",
        info: {
          originDropletId: "testId1",
          resultDropletId1: "testId2",
          resultDropletId2: "testId3",
          posX1: "10",
          posY1: "10",
          posX2: "20",
          posY2: "20"
        }
      };
      const mockBlock1: Block = {
        index: 1,
        type: "move",
        info: {
          dropletId: "testId2",
          posX: "5",
          posY: "5",
        }
      };
      const mockBlock2: Block = {
        index: 2,
        type: "move",
        info: {
          dropletId: "testId3",
          posX: "15",
          posY: "15",
        }
      };

      const updatedBlock1 = removeDropletId(mockBlock1, blockToRemove);
      const updatedBlock2 = removeDropletId(mockBlock2, blockToRemove);

      expect((updatedBlock1.info as MoveBlockInfo).dropletId).toBe("");
      expect((updatedBlock2.info as MoveBlockInfo).dropletId).toBe("");
    });
    test("Should not modify block info if block type is not recognized", () => {
      const blockToRemove: Block = {
        index: 0,
        type: "test",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
        }
      };
      const mockBlock: Block = {
        index: 1,
        type: "move",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
        }
      };

      const updatedBlock = removeDropletId(mockBlock, blockToRemove);

      expect(updatedBlock).toEqual(mockBlock);
    });
    test("Should handle undefined block info", () => {
      const blockToRemove: Block = {
        index: 0,
        type: "input",
        info: undefined
      };
      const mockBlock: Block = {
        index: 1,
        type: "move",
        info: undefined
      };

      const updatedBlock = removeDropletId(mockBlock, blockToRemove);

      expect(updatedBlock).toEqual(mockBlock);
    });
  });

  describe("removeDropletIdFromBlockInfo", () => {
    test("Should remove dropletId for output block", () => {
      const outputBlock: Block = {
        index: 0,
        type: "output",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
        } as OutputBlockInfo
      };

      removeDropletIdFromBlockInfo(outputBlock.type, outputBlock.info, "testId1");

      expect((outputBlock.info as OutputBlockInfo).dropletId).toBe("");
    });
    test("Should remove dropletId for move block", () => {
      const moveBlock: Block = {
        index: 0,
        type: "move",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
        } as MoveBlockInfo
      };

      removeDropletIdFromBlockInfo(moveBlock.type, moveBlock.info, "testId1");

      expect((moveBlock.info as MoveBlockInfo).dropletId).toBe("");
    });
    test("Should remove dropletId for mix block", () => {
      const mixBlock: Block = {
        index: 0,
        type: "mix",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
          xSize: "5",
          ySize: "5"
        } as MixBlockInfo
      };

      removeDropletIdFromBlockInfo(mixBlock.type, mixBlock.info, "testId1");

      expect((mixBlock.info as MixBlockInfo).dropletId).toBe("");
    });
    test("Should remove dropletId for store block", () => {
      const storeBlock: Block = {
        index: 0,
        type: "store",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
          time: "50"
        } as StoreBlockInfo
      };

      removeDropletIdFromBlockInfo(storeBlock.type, storeBlock.info, "testId1");

      expect((storeBlock.info as StoreBlockInfo).dropletId).toBe("");
    });
    test("Should remove origin droplet 1 for merge block", () => {
      const mergeBlock: Block = {
        index: 0,
        type: "merge",
        info: {
          originDropletId1: "testId1",
          originDropletId2: "testId2",
          resultDropletId: "testId3",
          posX: "10",
          posY: "10"
        } as MergeBlockInfo
      };

      removeDropletIdFromBlockInfo(mergeBlock.type, mergeBlock.info, "testId1");

      expect((mergeBlock.info as MergeBlockInfo).originDropletId1).toBe("");
    });
    test("Should remove origin droplet 2 for merge block", () => {
      const mergeBlock: Block = {
        index: 0,
        type: "merge",
        info: {
          originDropletId1: "testId1",
          originDropletId2: "testId2",
          resultDropletId: "testId3",
          posX: "10",
          posY: "10"
        } as MergeBlockInfo
      };

      removeDropletIdFromBlockInfo(mergeBlock.type, mergeBlock.info, "testId2");

      expect((mergeBlock.info as MergeBlockInfo).originDropletId2).toBe("");
    });
    test("Should remove both origin droplets for merge block", () => {
      const mergeBlock: Block = {
        index: 0,
        type: "merge",
        info: {
          originDropletId1: "testId1",
          originDropletId2: "testId2",
          resultDropletId: "testId3",
          posX: "10",
          posY: "10"
        } as MergeBlockInfo
      };

      removeDropletIdFromBlockInfo(mergeBlock.type, mergeBlock.info, "testId1");
      removeDropletIdFromBlockInfo(mergeBlock.type, mergeBlock.info, "testId2");

      expect((mergeBlock.info as MergeBlockInfo).originDropletId1).toBe("");
      expect((mergeBlock.info as MergeBlockInfo).originDropletId2).toBe("");
    });
    test("Should remove origin droplet for split block", () => {
      const splitBlock: Block = {
        index: 0,
        type: "split",
        info: {
          originDropletId: "testId1",
          resultDropletId1: "testId2",
          resultDropletId2: "testId3",
          posX1: "10",
          posY1: "10",
          posX2: "20",
          posY2: "20"
        }
      };

      removeDropletIdFromBlockInfo(splitBlock.type, splitBlock.info, "testId1");

      expect((splitBlock.info as SplitBlockInfo).originDropletId).toBe("");
    });
    test("Should not modify block info if block type is not recognized", () => {
      const mockBlock: Block = {
        index: 0,
        type: "test",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
        }
      };
      const copyMockBlockInfo = {...mockBlock.info};

      removeDropletIdFromBlockInfo(mockBlock.type, mockBlock.info, "testId1");

      expect(mockBlock.info).toEqual(copyMockBlockInfo);
    });
    test("Should not remove dropletId if it is not the one to be removed", () => {
      const outputBlock: Block = {
        index: 0,
        type: "output",
        info: {
          dropletId: "testId1",
          posX: "10",
          posY: "10",
        } as OutputBlockInfo
      };

      removeDropletIdFromBlockInfo(outputBlock.type, outputBlock.info, "testId2");

      expect((outputBlock.info as OutputBlockInfo).dropletId).toBe("testId1");
    });
  });

  describe("removeDropletIdsIfNecessary", () => {
    test("Split followed by merge block", () => {
      const mockBlocks: Block[] = [
        {
          index: 0,
          type: "split",
          info: {
            originDropletId: "",
            resultDropletId1: "testId1",
            resultDropletId2: "testId2",
            posX1: "10",
            posY1: "10",
            posX2: "20",
            posY2: "20"
          }
        },
        {
          index: 1,
          type: "merge",
          info: {
            originDropletId1: "testId1",
            originDropletId2: "testId2",
            resultDropletId: "",
            posX: "10",
            posY: "10"
          }
        },
      ];

      const updatedBlocks = removeDropletIdsIfNecessary(mockBlocks);

      expect(updatedBlocks).toEqual(mockBlocks);
    });

    test("Merge followed by split block", () => {
      const mockBlocks: Block[] = [
        {
          index: 0,
          type: "merge",
          info: {
            originDropletId1: "testId1",
            originDropletId2: "testId2",
            resultDropletId: "",
            posX: "10",
            posY: "10"
          }
        },
        {
          index: 1,
          type: "split",
          info: {
            originDropletId: "",
            resultDropletId1: "testId1",
            resultDropletId2: "testId2",
            posX1: "10",
            posY1: "10",
            posX2: "20",
            posY2: "20"
          }
        },
      ];

      const updatedBlocks = removeDropletIdsIfNecessary(mockBlocks);

      expect((updatedBlocks[0].info as MergeBlockInfo).originDropletId2).toEqual("");
      expect((updatedBlocks[0].info as MergeBlockInfo).originDropletId1).toEqual("");
    });
  });
});