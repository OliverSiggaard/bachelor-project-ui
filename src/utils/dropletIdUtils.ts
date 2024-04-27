import {
  Block,
  InputBlockInfo,
  MergeBlockInfo, MixBlockInfo,
  MoveBlockInfo,
  OutputBlockInfo,
  SplitBlockInfo, StoreBlockInfo
} from "../types/blockTypes";

// Return all available dropletIds up until the given index
// add index for input block
// remove for output block
// remove origin droplets and add result droplet for merge block
// remove origin droplet and add result droplets for split block

export function getAvailableDropletIdsForIndex (blocks: Block[], index: number): string[] {
  let dropletIds: string[] = [];

  if (index < 0 || index >= blocks.length || blocks.length === 0) return dropletIds; // Return empty array if index is invalid or blocks array is empty

  for (let i = 0; i < index; i++) {
    if (blocks[i].info === undefined) continue; // Skip blocks without info
    const block = blocks[i];

    if (block.type === "input") {
      // Add dropletId for input block
      const dropletId = (block.info as InputBlockInfo).dropletId;
      if (dropletId !== "") dropletIds.push(dropletId); // Only add if dropletId is not empty
    } else if (block.type === "output") {
      // Remove dropletId for output block
      dropletIds = dropletIds.filter(id => id !== (block.info as InputBlockInfo).dropletId);
    } else if (block.type === "merge") {
      // Remove origin droplets and add result droplet for merge block
      dropletIds = dropletIds.filter(id => id !== (block.info as MergeBlockInfo).originDropletId1);
      dropletIds = dropletIds.filter(id => id !== (block.info as MergeBlockInfo).originDropletId2);
      const resultDropletId = (block.info as MergeBlockInfo).resultDropletId;
      if (resultDropletId !== "") dropletIds.push(resultDropletId); // Only add if resultDropletId is not empty
    } else if (block.type === "split") {
      // Remove origin droplet and add result droplets for split block
      dropletIds = dropletIds.filter(id => id !== (block.info as SplitBlockInfo).originDropletId);
      const resultDropletId1 = (block.info as SplitBlockInfo).resultDropletId1;
      const resultDropletId2 = (block.info as SplitBlockInfo).resultDropletId2;
      if (resultDropletId1 !== "") dropletIds.push(resultDropletId1); // Only add if resultDropletId1 is not empty
      if (resultDropletId2 !== "") dropletIds.push(resultDropletId2); // Only add if resultDropletId2 is not empty
    }
  }
  return dropletIds;
}

export function removeDropletIdsIfNecessary(blocks: Block[]) {
  const blocksCopy = [...blocks];
  for (let i = 0; i < blocksCopy.length; i++) {
    const dropletIds = getAvailableDropletIdsForIndex(blocksCopy, i);
    console.log(dropletIds);
    if (blocksCopy[i].info === undefined) continue;
    switch (blocksCopy[i].type) {
      case "output":
      case "move":
      case "mix":
      case "store":
        const blockInfo = blocksCopy[i].info as OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
        if (blockInfo.dropletId && !dropletIds.includes(blockInfo.dropletId)) {
          blocksCopy[i].info = {...blockInfo, dropletId: ""};
        }
        break;
      case "merge":
        const mergeBlockInfo = blocksCopy[i].info as MergeBlockInfo;
        if (mergeBlockInfo.originDropletId1 && !dropletIds.includes(mergeBlockInfo.originDropletId1)
          && mergeBlockInfo.originDropletId2 && !dropletIds.includes(mergeBlockInfo.originDropletId2)) {
          blocksCopy[i].info = {...mergeBlockInfo, originDropletId1: "", originDropletId2: ""};
        } else if (mergeBlockInfo.originDropletId1 && !dropletIds.includes(mergeBlockInfo.originDropletId1)) {
          blocksCopy[i].info = {...mergeBlockInfo, originDropletId1: ""};
        } else if (mergeBlockInfo.originDropletId2 && !dropletIds.includes(mergeBlockInfo.originDropletId2)) {
          blocksCopy[i].info = {...mergeBlockInfo, originDropletId2: ""};
        }
        break;
      case "split":
        const splitBlockInfo = blocksCopy[i].info as SplitBlockInfo;
        if (splitBlockInfo.originDropletId && !dropletIds.includes(splitBlockInfo.originDropletId)) {
          blocksCopy[i].info = {...splitBlockInfo, originDropletId: ""};
        }
        break;
      default:
        break;
    }
  }

  console.log(blocksCopy);
  return blocksCopy;
}

// Remove dropletId from blockInfo based on blockType if it depends on the removed dropletId
// remove dropletId for output, move, mix, store
// remove origin droplets for merge
// remove origin droplet for split
/*
export function removeDropletIdsIfNecessary(blocks: Block[], index: number, dispatch: any) {
  for (let i = 0; i < blocks.length; i++) {
    const dropletIds = getAvailableDropletIdsForIndex(blocks, i);
    if (i === index || blocks[i].info === undefined) continue;
    switch (blocks[i].type) {
      case "output":
      case "move":
      case "mix":
      case "store":
        const blockInfo = blocks[i].info as OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
        if (blockInfo.dropletId && !dropletIds.includes(blockInfo.dropletId)) {
          dispatch(editBlock({index: i, info: {...blockInfo, dropletId: ""}}));
        }
        break;
      case "merge":
        const mergeBlockInfo = blocks[i].info as MergeBlockInfo;
        if (mergeBlockInfo.originDropletId1 && !dropletIds.includes(mergeBlockInfo.originDropletId1)) {
          dispatch(editBlock({index: i, info: {...mergeBlockInfo, originDropletId1: ""}}));
        }
        if (mergeBlockInfo.originDropletId2 && !dropletIds.includes(mergeBlockInfo.originDropletId2)) {
          dispatch(editBlock({index: i, info: {...mergeBlockInfo, originDropletId2: ""}}));
        }
        break;
      case "split":
        const splitBlockInfo = blocks[i].info as SplitBlockInfo;
        if (splitBlockInfo.originDropletId && !dropletIds.includes(splitBlockInfo.originDropletId)) {
          dispatch(editBlock({index: i, info: {...splitBlockInfo, originDropletId: ""}}));
        }
        break;
      default:
        break;
    }
  }
}

 */

// Distribute removal of dropletId based on block type
export function removeDropletId(block: Block, blockToRemove: Block) {
  /*
  if (!block?.info || !blockToRemove?.info) return block;
  switch (blockToRemove.type) {
    case "input":
      removeDropletIdFromBlockInfo(block.type, block.info, (blockToRemove.info as InputBlockInfo).dropletId);
      break;
    case "merge":
      removeDropletIdFromBlockInfo(block.type, block.info, (blockToRemove.info as MergeBlockInfo).resultDropletId);
      break;
    case "split":
      removeDropletIdFromBlockInfo(block.type, block.info, (blockToRemove.info as SplitBlockInfo).resultDropletId1);
      removeDropletIdFromBlockInfo(block.type, block.info, (blockToRemove.info as SplitBlockInfo).resultDropletId2);
      break;
    default:
      break;
  }
  return block;

   */
  return block;
}

// Removes droppedId from blockInfo based on blockType if it depends on the removed dropletId
// remove dropletId for output, move, mix, store
// remove origin droplets for merge
// remove origin droplet for split
export function removeDropletIdFromBlockInfo(blockType: string, blockInfo: any, dropletIdToRemove: string) {
  /*
  switch (blockType) {
    case "output":
    case "move":
    case "mix":
    case "store":
      const info = blockInfo as OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
      if (info.dropletId === dropletIdToRemove) {
        blockInfo.dropletId = "";
      }
      break;
    case "merge":
      const mergeBlockInfo = blockInfo as MergeBlockInfo;
      if (mergeBlockInfo.originDropletId1 === dropletIdToRemove) {
        mergeBlockInfo.originDropletId1 = "";
      }
      if (mergeBlockInfo.originDropletId2 === dropletIdToRemove) {
        mergeBlockInfo.originDropletId2 = "";
      }
      break;
    case "split":
      const splitBlockInfo = blockInfo as SplitBlockInfo;
      if (splitBlockInfo.originDropletId === dropletIdToRemove) {
        splitBlockInfo.originDropletId = "";
      }
      break;
    default:
      break;
  }

   */
}