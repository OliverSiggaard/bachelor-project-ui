export interface Block {
  index: number;
  type: string;
  color: string;
  info?: CodeBlockInfo;
}

export type CodeBlockInfo = InputBlockInfo | OutputBlockInfo | MoveBlockInfo | MergeBlockInfo | SplitBlockInfo | MixBlockInfo | StoreBlockInfo | IfBlockInfo | RepeatBlockInfo // Add more blocks here

export interface InputBlockInfo {
  dropletID: string;
  posX: string;
  posY: string;
  volume: string;
}

export interface OutputBlockInfo {
  dropletID: string;
  posX: string;
  posY: string;
}

export interface MoveBlockInfo {
  dropletID: string;
  posX: string;
  posY: string;
}

export interface MergeBlockInfo {
  resultDropletID: string;
  dropletID1: string;
  dropletID2: string;
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
  dropletID: string;
}

export interface StoreBlockInfo {
  dropletID: string;
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