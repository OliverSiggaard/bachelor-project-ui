import {Block} from "../types/blockTypes";

export const checkReadyToCompile = (blocks: Block[]) => {
  // Check if there are blocks to compile
  if (blocks.length === 0) {
    throw new Error("No blocks to compile.");
  }
  // Check if all blocks have info and that all info fields are filled out
  for (const block of blocks) {
    if (!block.info) {
      throw new Error("Block " + block.index + " is missing info.");
    } else {
      for (const key in block.info) {
        if ((block.info as any)[key] === "") {
          throw new Error("Block " + block.index + " is missing info in field " + key + ".");
        }
      }
    }
  }
}