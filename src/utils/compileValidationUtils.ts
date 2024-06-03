import {
  Block,
  InputBlockInfo,
  MergeBlockInfo,
  MixBlockInfo,
  MoveBlockInfo,
  OutputBlockInfo, SplitBlockInfo,
  StoreBlockInfo
} from "../types/blockTypes";
import {getAvailableDropletIdsForIndex} from "./dropletIdUtils";

export const checkReadyToCompile = (blocks: Block[]) => {
  // Check if there are blocks to compile
  if (blocks.length === 0) {
    throw new Error("No blocks to compile.");
  }
  for (const block of blocks) {
    // Check if all blocks have info
    if (!block.info) {
      throw new Error("Block " + block.index + " is missing info.");
    } else {
      // Check if all blocks have a valid dropletId
      const dropletIds = getAvailableDropletIdsForIndex(blocks, block.index);
      if (!dropletIdAvailable(dropletIds, block)) {
        throw new Error("Block " + block.index + " has an invalid droplet ID.");
      }
      // Check if all info fields are filled out
      for (const key in block.info) {
        if ((block.info as any)[key] === "") {
          throw new Error("Block " + block.index + " is missing info in field " + key + ".");
        }
      }
    }
  }
}

const dropletIdAvailable = (availableDropletIds: string[], block: Block) => {
  switch (block.type) {
    case "input":
      return true;
    case "output":
    case "move":
    case "mix":
    case "store":
      const blockInfo = block.info as InputBlockInfo | OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
      return availableDropletIds.includes(blockInfo.dropletId);
    case "merge":
      const mergeBlockInfo = block.info as MergeBlockInfo;
      return (availableDropletIds.includes(mergeBlockInfo.originDropletId1) && availableDropletIds.includes(mergeBlockInfo.originDropletId2));
    case "split":
      const splitBlockInfo = block.info as SplitBlockInfo;
      return availableDropletIds.includes(splitBlockInfo.originDropletId);
    default:
      break;
  }
}