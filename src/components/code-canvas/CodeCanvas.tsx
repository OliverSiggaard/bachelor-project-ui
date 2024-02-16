import React from 'react';
import TestBlock from "../blocks/TestBlock";
import {useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";

const CodeCanvas: React.FC = () => {

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);

  const renderBlock = (block: Block, index: number) => {
    return (
      <TestBlock
        key={index}
        index={index}
        color={block.color}
      />
    )
  };

  return (
    <div className="h-full w-full relative overflow-y-auto">
      <div className="flex flex-row flex-wrap">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
};

export default CodeCanvas;
