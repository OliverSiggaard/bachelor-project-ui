import { Block } from "../types/blockTypes";

// Utility function to validate the uploaded program sketch
export const validateUploadedBlocks = (uploadedFileContent: string)=> {
  try {
    const uploadedBlocks = JSON.parse(uploadedFileContent) as Block[];
    for (const block of uploadedBlocks) {
      validateBlockType(block); // Check if block type is valid
      validateBlockInfo(block); // Check if block info is valid
    }
    validateBlockIndexes(uploadedBlocks); // Check if block indexes are unique
    return true;
  } catch (error) {
    console.error(error);
    return (error as Error).message;
  }
}

// Helper functions for validating blocks and getting error messages

const validateBlockType = (block: Block) => {
  const validBlockTypes = ["input", "output", "move", "mix", "store", "merge", "split"];
  if (!validBlockTypes.includes(block.type)) {
    throw new Error("Invalid block type found in uploaded program sketch: " + block.type);
  }
}

const blockInfoKeys: Record<string, string[]> = {
  'input': ['dropletId', 'posX', 'posY', 'volume'],
  'output': ['dropletId', 'posX', 'posY'],
  'move': ['dropletId', 'posX', 'posY'],
  'mix': ['dropletId', 'posX', 'posY', 'xSize', 'ySize'],
  'store': ['dropletId', 'posX', 'posY', 'time'],
  'merge': ['originDropletId1', 'originDropletId2', 'resultDropletId', 'posX', 'posY'],
  'split': ['originDropletId', 'resultDropletId1', 'resultDropletId2', 'posX1', 'posY1', 'posX2', 'posY2']
}

const validateBlockInfo = (block: Block) => {
  if (!block.info) return;
  const expectedBlockInfoKeys = blockInfoKeys[block.type];
  const actualBlockInfoKeys = Object.keys(block.info as object);
  if (expectedBlockInfoKeys.length !== actualBlockInfoKeys.length
    || !expectedBlockInfoKeys.every(key => actualBlockInfoKeys.includes(key))) {
    throw new Error(getInvalidBlockErrorMessage(block));
  }
}

const getInvalidBlockErrorMessage = (block: Block) => {
  return "Invalid " + block.type + " block info found in uploaded program sketch: " + JSON.stringify(block.info);
}

const validateBlockIndexes = (blocks: Block[]) => {
  blocks.forEach((block, index) => {
    if (block.index !== index) {
      throw new Error("Invalid block index found in uploaded program sketch: " + block.index);
    }
  });
}