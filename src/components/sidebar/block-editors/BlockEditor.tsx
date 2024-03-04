import React from 'react';
import {useSelector} from "react-redux";
import {Block} from "../../../types/blockTypes";
import InputBlockEditor from "./InputBlockEditor";

const BlockEditor: React.FC = () => {
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);
  const blockIndex = useSelector((state: {selectedIndex: number | null}) => state.selectedIndex);

  const selectedBlock = blocks.at(blockIndex!);

  const renderBlockEditor = () => {
    if (!selectedBlock || blockIndex === null) return null;

    switch (selectedBlock.type) {
      case "input":
        return <InputBlockEditor block={selectedBlock} />
      default:
        return null;
    }
  }

  return (
    <div>
      {renderBlockEditor()}
    </div>
  );
};

export default BlockEditor;