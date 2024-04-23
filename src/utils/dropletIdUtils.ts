import {Block, InputBlockInfo, MergeBlockInfo, SplitBlockInfo} from "../types/blockTypes";

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