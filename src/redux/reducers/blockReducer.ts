import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Block, CodeBlockInfo} from "../../types/blockTypes";
import update from 'immutability-helper'

interface BlocksState {
  blocks: Block[];
  selectedIndex: number | null;
}

const initialState: BlocksState = {
  blocks: [],
  selectedIndex: null,
};

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    addBlock(state, action: PayloadAction<Block>) {
      state.blocks.push(action.payload);
      state.selectedIndex = state.blocks.length - 1; // Set selected block to the new block
    },
    removeBlock(state) {
      state.blocks.pop();
      // Remove selection of block if the selected block is the one popped from the block array
      if (state.blocks.length === state.selectedIndex) state.selectedIndex = null;
    },
    moveBlock(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
      const { dragIndex, hoverIndex } = action.payload;

      // Update blocks array immutably using immutability-helper
      state.blocks = update(state.blocks, {
        $splice: [
          [dragIndex, 1], // Remove dragged block
          [hoverIndex, 0, state.blocks[dragIndex]], // Insert dragged block at hover index
        ],
      });

      // Update indices of all blocks based on their position in the array
      state.blocks = state.blocks.map((block, index) => ({ ...block, index }));
      // Update index of selected block
      state.selectedIndex = hoverIndex;

    },
    deleteAll(state) {
      state.blocks = [];
      state.selectedIndex = null;
    },
    runProgram() {
      console.log("This will send the program to the backend");
    },
    editBlock(state, action: PayloadAction<{ index: number; info: CodeBlockInfo }>) {
      const { index, info } = action.payload;
      state.blocks[index].info = info;
    },
    selectBlock(state, action: PayloadAction<number | null>) {
      state.selectedIndex = action.payload
    },
  },
});

export const {
  addBlock,
  removeBlock,
  moveBlock ,
  deleteAll,
  runProgram,
  editBlock,
  selectBlock,
} = blockSlice.actions;

export default blockSlice.reducer;