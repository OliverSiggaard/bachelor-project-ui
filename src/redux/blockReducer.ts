import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Block,
  CodeBlockInfo,
} from "../types/blockTypes";
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
    removeBlock(state, action: PayloadAction<number>) {
      const indexToRemove = action.payload;

      // Remove block at given index
      state.blocks.splice(indexToRemove, 1)

      // Update selected block if necessary
      if (state.selectedIndex === indexToRemove) {
        state.selectedIndex = null;
      } else if (state.selectedIndex! > indexToRemove) {
        state.selectedIndex!--;
      }

      // Update indexes of all blocks based on their position in the array
      state.blocks = state.blocks.map((block, index) => ({ ...block, index }));
    },
    moveBlock(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
      const { dragIndex, hoverIndex } = action.payload;

      // Check that indexes are within bounds:
      if (dragIndex < 0 || dragIndex > state.blocks.length ||hoverIndex < 0 ||hoverIndex > state.blocks.length) {
        return state;
      }

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
    editBlock(state, action: PayloadAction<{ index: number; info: CodeBlockInfo }>) {
      const { index, info } = action.payload;
      if (index >= 0 && index < state.blocks.length) {
        state.blocks[index].info = info;
      }
    },
    selectBlock(state, action: PayloadAction<number | null>) {
      const index = action.payload;
      state.selectedIndex = (index !== null && index >= 0 && index < state.blocks.length) ? index : null;
    },
    overwriteBlocks(state, action: PayloadAction<Block[]>) {
      state.blocks = action.payload;
      state.selectedIndex = null;
    }
  },
});

export const {
  addBlock,
  removeBlock,
  moveBlock ,
  deleteAll,
  editBlock,
  selectBlock,
  overwriteBlocks,
} = blockSlice.actions;

export default blockSlice.reducer;