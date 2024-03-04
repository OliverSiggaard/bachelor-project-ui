import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Block} from "../../../types/blockTypes";
import InputBlockEditor from "./InputBlockEditor";
import OutputBlockEditor from "./OutputBlockEditor";
import {Button, Divider} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import {selectBlock} from "../../../redux/reducers/blockReducer";
import MoveBlockEditor from "./MoveBlockEditor";
import MergeBlockEditor from "./MergeBlockEditor";
import SplitBlockEditor from "./SplitBlockEditor";

const BlockEditor: React.FC = () => {
  const dispatch = useDispatch();

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const blockIndex = useSelector((state: {selectedIndex: number | null}) => state.selectedIndex);

  const selectedBlock = blocks.at(blockIndex!);

  const renderBlockEditor = () => {
    if (!selectedBlock || blockIndex === null) return null;

    switch (selectedBlock.type) {
      case "input":
        return <InputBlockEditor block={selectedBlock} />
      case "output":
        return <OutputBlockEditor block={selectedBlock} />
      case "move":
        return <MoveBlockEditor block={selectedBlock} />
      case "merge":
        return <MergeBlockEditor block={selectedBlock} />
      case "split":
        return <SplitBlockEditor block={selectedBlock} />
      default:
        return null;
    }
  }

  return (
    <div>
      {blockIndex !== null &&
        <div>
          <Divider orientation="horizontal" sx={{borderTopWidth: 3}}/>
          <Button className="w-full" color="secondary" onClick={() => dispatch(selectBlock(null))}>
            <KeyboardArrowDown/>
          </Button>
          {renderBlockEditor()}
        </div>
      }
    </div>
  );
};

export default BlockEditor;