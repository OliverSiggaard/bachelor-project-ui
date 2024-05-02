import React from 'react';
import {
  Block,
  InputBlockInfo,
  MergeBlockInfo,
  MixBlockInfo,
  MoveBlockInfo,
  OutputBlockInfo,
  SplitBlockInfo,
  StoreBlockInfo
} from "../../../types/blockTypes";
import {useSelector} from "react-redux";
import {getAvailableDropletIdsForIndex} from "../../../utils/dropletIdUtils";
import {TextColors} from "../../../enums/textColors";

interface AvailableDropletIdDisplayProps {
  block: Block;
  num?: number;
}

const AvailableDropletIdDisplay: React.FC<AvailableDropletIdDisplayProps> = ({ block, num}) => {

  const blocks: Block[] = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dropletIds: string[] =  getAvailableDropletIdsForIndex(blocks, block.index);

  let available = true;
  let dropletId = "-";

  switch (block.type) {
    case "output":
    case "move":
    case "mix":
    case "store":
      const blockInfo = block.info as InputBlockInfo | OutputBlockInfo | MoveBlockInfo | MixBlockInfo | StoreBlockInfo;
      available = !blockInfo || (!blockInfo?.dropletId) || (blockInfo && dropletIds.includes(blockInfo.dropletId));
      dropletId = blockInfo?.dropletId || "-";
      break;
    case "merge":
      const mergeBlockInfo = block.info as MergeBlockInfo;
      if (num === 1) {
        available = !mergeBlockInfo || (!mergeBlockInfo?.originDropletId1) || (mergeBlockInfo && dropletIds.includes(mergeBlockInfo.originDropletId1));
        dropletId = mergeBlockInfo?.originDropletId1 || "-";
      } else if (num === 2) {
        available = !mergeBlockInfo || (!mergeBlockInfo?.originDropletId2) || (mergeBlockInfo && dropletIds.includes(mergeBlockInfo.originDropletId2));
        dropletId = mergeBlockInfo?.originDropletId2 || "-";
      }
      break;
    case "split":
      const splitBlockInfo = block.info as SplitBlockInfo;
      available = !splitBlockInfo || (!splitBlockInfo?.originDropletId) || (splitBlockInfo && dropletIds.includes(splitBlockInfo.originDropletId));
      dropletId = splitBlockInfo?.originDropletId || "-";
      break;
    default:
      break;
  }

  return <span style={{color: available ? TextColors.normalBlockText : TextColors.dropletIdUnavailable}}>{dropletId}</span>
};

export default AvailableDropletIdDisplay;