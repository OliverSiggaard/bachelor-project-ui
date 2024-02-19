import React from 'react';
import BaseBlock from "../blocks/BaseBlock";
import {useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";
import {ArrowForward} from "@mui/icons-material";
import InputBlock from "../blocks/InputBlock";

const CodeCanvas: React.FC = () => {
  const blocks = useSelector((state: { block: { blocks: Block[] } }) => state.block.blocks);

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'base':
        return renderBaseBlock(block, index);
      case 'input':
        return renderInputBlock(block, index);
      default:
        return null;
    }
  };

  const renderBaseBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <BaseBlock index={block.index} color={block.color} />
      {/* Arrows between blocks */}
      {index !== blocks.length - 1 && (
        <div className="flex items-center">
          <ArrowForward />
        </div>
      )}
    </div>
  );

  const renderInputBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <InputBlock block={block} />
      {/* Arrows between blocks */}
      {index !== blocks.length - 1 && (
        <div className="flex items-center">
          <ArrowForward/>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full w-full relative overflow-y-auto" style={{margin: 10}}>
      <div className="flex flex-row flex-wrap">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
};

export default CodeCanvas;
