export interface Block {
  index: number;
  type: string;
  info?: CodeBlockInfo;
}

export type CodeBlockInfo = InputBlockInfo | OutputBlockInfo | MoveBlockInfo | MergeBlockInfo | SplitBlockInfo | MixBlockInfo | StoreBlockInfo | IfBlockInfo | RepeatBlockInfo // Add more blocks here

export interface InputBlockInfo {
  dropletID: string;
  xPos: string;
  yPos: string;
  volume: string;
}

export interface OutputBlockInfo {
  dropletID: string;
  xPos: string;
  yPos: string;
}

export interface MoveBlockInfo {
  dropletID: string;
  xPos: string;
  yPos: string;
}

export interface MergeBlockInfo {
  originDropletID1: string;
  originDropletID2: string;
  resultDropletID: string;
  xPos: string;
  yPos: string;
}

export interface SplitBlockInfo {
  originDropletID: string;
  resultDropletID1: string;
  resultDropletID2: string;
  ratio: string;
  xPos1: string;
  yPos1: string;
  xPos2: string;
  yPos2: string;
}

export interface MixBlockInfo {
  dropletID: string;
  xPos: string;
  yPos: string;
  xSize: string;
  ySize: string;
}

export interface StoreBlockInfo {
  dropletID: string;
  xPos: string;
  yPos: string;
  time: string;
}

//TODO: How to handle if block in the UI?
export interface IfBlockInfo {
  condition: string;
}

//TODO: How to handle repeat block in the UI?
export interface RepeatBlockInfo {
  times: string;
}





// Define interfaces for more blocks here