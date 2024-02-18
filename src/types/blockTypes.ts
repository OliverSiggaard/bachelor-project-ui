export interface Block {
  index: number;
  type: string;
  color: string;
  info?: CodeBlockInfo;
}

export type CodeBlockInfo = InputBlockInfo | MoveBlockInfo // Add more blocks here

export interface InputBlockInfo {
  dropletID: string;
  posX: string;
  posY: string;
  volume: string;
}

export interface MoveBlockInfo {
  dropletID: string;
  posX: string;
  posY: string;
}

// Define interfaces for more blocks here