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
      dropletIds.push((block.info as InputBlockInfo).dropletId);
    } else if (block.type === "output") {
      // Remove dropletId for output block
      dropletIds = dropletIds.filter(id => id !== (block.info as InputBlockInfo).dropletId);
    } else if (block.type === "merge") {
      // Remove origin droplets and add result droplet for merge block
      dropletIds = dropletIds.filter(id => id !== (block.info as MergeBlockInfo).originDropletId1);
      dropletIds = dropletIds.filter(id => id !== (block.info as MergeBlockInfo).originDropletId2);
      dropletIds.push((block.info as MergeBlockInfo).resultDropletId);
    } else if (block.type === "split") {
      // Remove origin droplet and add result droplets for split block
      dropletIds = dropletIds.filter(id => id !== (block.info as SplitBlockInfo).originDropletId);
      dropletIds.push((block.info as SplitBlockInfo).resultDropletId1);
      dropletIds.push((block.info as SplitBlockInfo).resultDropletId2);
    }
  }
  return dropletIds;
}