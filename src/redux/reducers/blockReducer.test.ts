import blockReducer, { addBlock, removeBlock, moveBlock, deleteAll, editBlock, selectBlock } from './blockReducer';
import {Block, CodeBlockInfo} from "../../types/blockTypes";

describe("Block Reducer", () => {
  let initialState: { blocks: Block[]; selectedIndex: number | null };

  beforeEach(() => {
    initialState = {
      blocks: [
        {index: 0, type: "input", info: {dropletId: "1", posX: "3", posY: "3", volume: "10"}},
        {index: 1, type: "move", info: {dropletId: "1", posX: "6", posY: "6"}},
        {index: 2, type: "output", info: {dropletId: "1", posX: "6", posY: "6"}},
      ],
      selectedIndex: null,
    };
  });

  test("addBlock", () => {
    const block: Block = {index: 0, type: "input", info: {dropletId: "1", posX: "1", posY: "1", volume: "10"}};

    const action = addBlock(block);
    const nextState = blockReducer(initialState, action);

    expect(nextState.blocks).toHaveLength(4);
    expect(nextState.blocks[3]).toEqual(block);
    expect(nextState.selectedIndex).toBe(3);
  });

  test("removeBlock", () => {
    const indexToRemove: number = 0;
    const prevState = { ...initialState };

    const action = removeBlock(indexToRemove);
    const nextState = blockReducer(initialState, action);

    expect(nextState.blocks).toHaveLength(2);
    expect(nextState.selectedIndex).toBe(null);
    // Check that block indexes are updated correctly:
    expect(nextState.blocks[0].index).toEqual(prevState.blocks[1].index - 1);
    expect(nextState.blocks[1].index).toEqual(prevState.blocks[2].index - 1);
    expect(nextState.blocks[0].info).toEqual(prevState.blocks[1].info);
    expect(nextState.blocks[1].info).toEqual(prevState.blocks[2].info);

  });
  test("removeBlock when there are no blocks", () => {
    initialState.blocks = []; // Remove blocks from initial state

    const action = removeBlock(0);
    const nextState = blockReducer(initialState, action);

    expect(nextState.blocks).toHaveLength(0);
    expect(nextState.selectedIndex).toBe(null);
  });
  test("removeBlock where selected index is the index to be removed", () => {
    const indexToRemove: number = 0;
    initialState.selectedIndex = indexToRemove;

    const action = removeBlock(indexToRemove);
    const nextState = blockReducer(initialState, action);

    expect(nextState.selectedIndex).toBe(null); // Selected block is null
  });
  test("removeBlock where selected index is larger than the index to be removed", () => {
    const indexToRemove: number = 1;
    initialState.selectedIndex = 2;

    const action = removeBlock(indexToRemove);
    const nextState = blockReducer(initialState, action);

    expect(nextState.selectedIndex).toBe(1); // Selected index is one less
  });
  test("removeBlock where selected index is less than the index to be removed", () => {
    const indexToRemove: number = 2;
    initialState.selectedIndex = 0;

    const action = removeBlock(indexToRemove);
    const nextState = blockReducer(initialState, action);

    expect(nextState.selectedIndex).toBe(0); // Selected index is the same
  });

  test("moveBlock", () => {
    const dragIndex: number = 0;
    const hoverIndex: number = 2;
    const prevState = { ...initialState };

    const action = moveBlock({dragIndex, hoverIndex});
    const nextState = blockReducer(initialState, action);

    // We cannot compare prev and next index, however we can compare info and see that the blocks are switched
    // (Clear when block info is different)
    expect(nextState.blocks[hoverIndex].info).toEqual(prevState.blocks[dragIndex].info);
    expect(nextState.blocks[dragIndex].info).toEqual(prevState.blocks[hoverIndex].info);
    expect(nextState.blocks).toHaveLength(prevState.blocks.length);

    nextState.blocks.forEach((block, index) => {
      expect(block.index).toBe(index);
    });

    expect(nextState.selectedIndex).toBe(hoverIndex);
  });
  test("moveBlock when an index is out of bounds - negative number", () => {
    const dragIndex: number = -1;
    const hoverIndex: number = 2;
    const prevState = { ...initialState };

    const action = moveBlock({dragIndex, hoverIndex});
    const nextState = blockReducer(initialState, action);

    expect(nextState).toEqual(prevState);
  });
  test("moveBlock when an index is out of bounds - large number", () => {
    const dragIndex: number = 0;
    const hoverIndex: number = 1000;
    const prevState = { ...initialState };

    const action = moveBlock({dragIndex, hoverIndex});
    const nextState = blockReducer(initialState, action);

    expect(nextState).toEqual(prevState);
  });

  test("deleteAll", () => {
    const action = deleteAll();
    const nextState = blockReducer(initialState, action);

    expect(nextState).toEqual({blocks: [], selectedIndex: null});
  });

  test("editBlock", () => {
    const info = {dropletId: "5", posX: "10", posY: "10", volume: "5"} as CodeBlockInfo;
    const index: number = 0; // Index to edit (input block)

    const action = editBlock({index, info});
    const nextState = blockReducer(initialState, action);

    expect(nextState.blocks[0].info).toEqual(info);
  });
  test("editBlock with index out of bounds should not change state", () => {
    const info = {dropletId: "5", posX: "10", posY: "10", volume: "5"} as CodeBlockInfo;
    const index: number = -1;
    const prevState = { ...initialState };

    const action = editBlock({index, info});
    const nextState = blockReducer(initialState, action);

    expect(nextState).toEqual(prevState);
  });

  test("selectBlock number", () => {
    const selectedIndex: number = 0;

    const action = selectBlock(selectedIndex);
    const nextState = blockReducer(initialState, action);

    expect(nextState.selectedIndex).toEqual(selectedIndex);
  });
  test("selectBlock null", () => {
    const selectedIndex: null = null;

    const action = selectBlock(selectedIndex);
    const nextState = blockReducer(initialState, action);

    expect(nextState.selectedIndex).toEqual(null);
  });
  test("selectBlock with negative index should set selected index to null", () => {
    const selectedIndex: number = -1;

    const action = selectBlock(selectedIndex);
    const nextState = blockReducer(initialState, action);

    expect(nextState.selectedIndex).toEqual(null);
  });
  test("selectBlock with large index out of bounds should set selected index to null", () => {
    const selectedIndex: number = 1000;

    const action = selectBlock(selectedIndex);
    const nextState = blockReducer(initialState, action);

    expect(nextState.selectedIndex).toEqual(null);
  });
});