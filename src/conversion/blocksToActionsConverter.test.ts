import {convertBlocksToActions} from "./blocksToActionsConverter";
import {Block} from "../types/blockTypes";

describe("convertBlocksToActions", () => {
  test("Should convert blocks to actions correctly", () => {
    const blocks: Block[] = [
      {index: 0, type: "input", info: {dropletId: "1", posX: "3", posY: "3", volume: "10"}},
      {index: 1, type: "move", info: {dropletId: "1", posX: "6", posY: "6"}},
      {index: 2, type: "output", info: {dropletId: "1", posX: "6", posY: "6"}},
    ];

    const expectedActions = {
      program_actions: [
        {action: "input", id: 0, next: 1, dropletId: "1", posX: "3", posY: "3", volume: "10"},
        {action: "move", id: 1, next: 2, dropletId: "1", posX: "6", posY: "6"},
        {action: "output", id: 2, next: -1, dropletId: "1", posX: "6", posY: "6"},
      ],
    };

    const result = convertBlocksToActions(blocks);

    expect(result).toEqual(expectedActions);
  });
  test("Should convert a single block to a single action", () => {
    const blocks: Block[] = [{index: 0, type: "input", info: {dropletId: "1", posX: "1", posY: "1", volume: "20"}}];
    const expectedActions = {
      program_actions: [{action: "input", id: 0, next: -1, dropletId: "1", posX: "1", posY: "1", volume: "20"}]
    };

    const result = convertBlocksToActions(blocks);

    expect(result).toEqual(expectedActions);
  });
  test("Should handle empty blocks array", () => {
    const blocks: Block[] = [];
    const expectedActions = {program_actions: []};

    const result = convertBlocksToActions(blocks);

    expect(result).toEqual(expectedActions);
  })
});