export interface Block {
  index: number;
  type: string;
  info?: CodeBlockInfo;
}

export type CodeBlockInfo = InputBlockInfo | OutputBlockInfo | MoveBlockInfo | MergeBlockInfo | SplitBlockInfo | MixBlockInfo | StoreBlockInfo | IfBlockInfo | RepeatBlockInfo // Add more blocks here

export interface InputBlockInfo {
  dropletId: string;
  posX: string;
  posY: string;
  volume: string;
}

export interface OutputBlockInfo {
  dropletId: string;
  posX: string;
  posY: string;
}

export interface MoveBlockInfo {
  dropletId: string;
  posX: string;
  posY: string;
}

export interface MergeBlockInfo {
  originDropletId1: string;
  originDropletId2: string;
  resultDropletId: string;
  posX: string;
  posY: string;
}

export interface SplitBlockInfo {
  originDropletId: string;
  resultDropletId1: string;
  resultDropletId2: string;
  ratio: string;
  posX1: string;
  posY1: string;
  posX2: string;
  posY2: string;
}

export interface MixBlockInfo {
  dropletId: string;
  posX: string;
  posY: string;
  xSize: string;
  ySize: string;
}

export interface StoreBlockInfo {
  dropletId: string;
  posX: string;
  posY: string;
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