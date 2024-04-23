import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Block,
  CodeBlockInfo,
  InputBlockInfo,
  MergeBlockInfo, MixBlockInfo, MoveBlockInfo,
  OutputBlockInfo,
  SplitBlockInfo, StoreBlockInfo
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

      // Check that index is within bounds:
      if (indexToRemove < 0 || indexToRemove >= state.blocks.length) {
        return state;
      }

      // Remove dropletIds for blocks that depend on the removed block
      switch (state.blocks[indexToRemove].type) {
        case "input":
          const inputBlockInfo = (state.blocks[indexToRemove].info as InputBlockInfo);
          if (inputBlockInfo === undefined) break;
          const inputDropletIdToRemove = inputBlockInfo.dropletId;
          state.blocks = state.blocks.map(block => {
            if (block.info === undefined) return block;

            switch (block.type) {
              case "output":
              case "move":
              case "mix":
              case "store":
                const blockInfo = block.info as OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
                if (blockInfo.dropletId === inputDropletIdToRemove) {
                  blockInfo.dropletId = "";
                }
                break;
              case "merge":
                const mergeBlockInfo = block.info as MergeBlockInfo;
                if (mergeBlockInfo.originDropletId1 === inputDropletIdToRemove) {
                  mergeBlockInfo.originDropletId1 = "";
                }
                if (mergeBlockInfo.originDropletId2 === inputDropletIdToRemove) {
                  mergeBlockInfo.originDropletId2 = "";
                }
                break;
              case "split":
                const splitBlockInfo = block.info as SplitBlockInfo;
                if (splitBlockInfo.originDropletId === inputDropletIdToRemove) {
                  splitBlockInfo.originDropletId = "";
                }
                break;
              default:
                break;
            }
            return block;
          });
          break;
        case "merge":
          const mergeBlockInfo = (state.blocks[indexToRemove].info as MergeBlockInfo)
          if (mergeBlockInfo === undefined) break;
          const mergeDropletIdToRemove = mergeBlockInfo.resultDropletId;
          state.blocks = state.blocks.map(block => {
            if (block.info === undefined) return block;

            switch (block.type) {
              case "output":
              case "move":
              case "mix":
              case "store":
                const blockInfo = block.info as OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
                if (blockInfo.dropletId === mergeDropletIdToRemove) {
                  blockInfo.dropletId = "";
                }
                break;
              case "split":
                const splitBlockInfo = block.info as SplitBlockInfo;
                if (splitBlockInfo.originDropletId === mergeDropletIdToRemove) {
                  splitBlockInfo.originDropletId = "";
                }
                break;
              default:
                break;
            }
            return block;
          });
          break;
        case "split":
          const splitBlockInfo = (state.blocks[indexToRemove].info as SplitBlockInfo)
          if (splitBlockInfo === undefined) break;
          const splitDropletIdToRemove1 = splitBlockInfo.resultDropletId1;
          const splitDropletIdToRemove2 = splitBlockInfo.resultDropletId2;
          state.blocks = state.blocks.map(block => {
            if (block.info === undefined) return block;

            switch (block.type) {
              case "output":
              case "move":
              case "mix":
              case "store":
                const blockInfo = block.info as OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
                if (blockInfo.dropletId === splitDropletIdToRemove1 || blockInfo.dropletId === splitDropletIdToRemove2) {
                  blockInfo.dropletId = "";
                }
                break;
              case "merge":
                const mergeBlockInfo = block.info as MergeBlockInfo;
                if (mergeBlockInfo.originDropletId1 === splitDropletIdToRemove1 || mergeBlockInfo.originDropletId1 === splitDropletIdToRemove2) {
                  mergeBlockInfo.originDropletId1 = "";
                }
                if (mergeBlockInfo.originDropletId2 === splitDropletIdToRemove1 || mergeBlockInfo.originDropletId2 === splitDropletIdToRemove2) {
                  mergeBlockInfo.originDropletId2 = "";
                }
                break;
              default:
                break;
            }
            return block;
          });
          break;
      }


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
  },
});

export const {
  addBlock,
  removeBlock,
  moveBlock ,
  deleteAll,
  editBlock,
  selectBlock,
} = blockSlice.actions;

export default blockSlice.reducer;