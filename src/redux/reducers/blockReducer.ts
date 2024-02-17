import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Block} from "../../types/blockTypes";
import update from 'immutability-helper'

interface BlocksState {
  blocks: Block[];
}

const initialState: BlocksState = {
  blocks: [],
};

const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    addTestBlock(state, action: PayloadAction<Block>) {
      state.blocks.push(action.payload);
    },
    removeTestBlock(state) {
      state.blocks.pop();
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
    },
    deleteAll(state) {
      state.blocks = [];
    },
    runProgram() {
      console.log("This will send the program to the backend");
    },
  },
});

export const {
  addTestBlock,
  removeTestBlock,
  moveBlock ,
  deleteAll,
  runProgram,
} = blockSlice.actions;

export default blockSlice.reducer;