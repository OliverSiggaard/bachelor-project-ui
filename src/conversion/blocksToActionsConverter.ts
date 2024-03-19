import {Block} from "../types/blockTypes";

// Responsible for converting the blocks to actions understood by the backend
export const convertBlocksToActions = (blocks: Block[]) => {

  const actions: any[] = [];

  blocks.forEach(function (block) {
    const { type, index, info } = block;

    const nextAction = index >= (blocks.length - 1) ? -1 : index + 1

    const actionJSON = {
      action: type,
      id: index,
      next: nextAction,
      ...info,
    }

    actions.push(actionJSON);
  });

  return {program_actions: actions}
}