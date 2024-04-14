import React from 'react';
import {Button} from "@mui/material";
import {addBlock} from "../../redux/blockReducer";
import {useDispatch, useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";
import BlockEditor from "./block-editors/BlockEditor";
import AddBlockButton from "./AddBlockButton";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";
import {getAvailableDropletIdsForIndex} from "../../utils/dropletIdUtils";

const BlockSidebar: React.FC = () => {
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const dispatch = useDispatch();
  const index = useSelector((state: {selectedIndex: number | null}) => state.selectedIndex);

  const addBlockOfType = (type: string) => {
    const newBlockId = blocks.length;
    dispatch(addBlock({index: newBlockId, type: type}));
  }

  const logBlocks = () => {
    for (let i = 0; i < blocks.length; i++) {
      console.log(blocks.at(i));
    }
  }

  const logDropletIds = () => {
    if (index !== null) {
      console.log(getAvailableDropletIdsForIndex(blocks, index).toString());
    }
  }

  const blockButtons = [
    { color: BlockColors.InputBlockColor, icon: BlockIcons.InputBlockIcon, text: "Input Block", type: "input" },
    { color: BlockColors.OutputBlockColor, icon: BlockIcons.OutputBlockIcon, text: "Output Block", type: "output" },
    { color: BlockColors.MoveBlockColor, icon: BlockIcons.MoveBlockIcon, text: "Move Block", type: "move" },
    { color: BlockColors.MergeBlockColor, icon: BlockIcons.MergeBlockIcon, text: "Merge Block", type: "merge" },
    { color: BlockColors.SplitBlockColor, icon: BlockIcons.SplitBlockIcon, text: "Split Block", type: "split" },
    { color: BlockColors.MixBlockColor, icon: BlockIcons.MixBlockIcon, text: "Mix Block", type: "mix" },
    { color: BlockColors.StoreBlockColor, icon: BlockIcons.StoreBlockIcon, text: "Store Block", type: "store" },
  ];

  const AddBlockButtons = blockButtons.map(blockButton => (
    <AddBlockButton
      key={blockButton.type}
      color={blockButton.color}
      icon={blockButton.icon}
      text={blockButton.text}
      onClick={() => addBlockOfType(blockButton.type)}
    />
  ));

  return (
    <div className="flex flex-col" style={{ minWidth: 260, maxWidth: 260 }}>
      <div className="overflow-auto" style={{direction: "rtl"}}>
        <div className="flex flex-col items-center space-y-6" style={{padding: "25px 20px", direction: "ltr"}}>
          {AddBlockButtons}
          <div style={{height: 40}}/>
          <span>Temporary Dev Buttons :</span>
          <Button variant="contained" color="secondary" onClick={logBlocks} sx={{width: 200, minHeight: 40}}>
            Log Blocks
          </Button>
          <Button variant="contained" color="secondary" onClick={logDropletIds} sx={{width: 200, minHeight: 40}}>
            Log available Droplet IDs for selected block
          </Button>
        </div>
      </div>
      <BlockEditor />
    </div>
  );
};

export default BlockSidebar;
