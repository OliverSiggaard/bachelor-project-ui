import React from 'react';
import BaseBlock from "../blocks/BaseBlock";
import {useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";
import {ArrowForward} from "@mui/icons-material";
import InputBlock from "../blocks/InputBlock";
import OutputBlock from "../blocks/OutputBlock";
import MoveBlock from "../blocks/MoveBlock";
import MergeBlock from "../blocks/MergeBlock";
import SplitBlock from '../blocks/SplitBlock';
import MixBlock from '../blocks/MixBlock';
import StoreBlock from "../blocks/StoreBlock";

const CodeCanvas: React.FC = () => {
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);

  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'base':
        return renderBaseBlock(block);
      case 'input':
        return renderInputBlock(block);
      case 'output':
          return renderOutputBlock(block);
      case 'move':
          return renderMoveBlock(block);
      case 'merge':
          return renderMergeBlock(block);
      case 'split':
          return renderSplitBlock(block);
      case 'mix':
          return renderMixBlock(block);
      case 'store':
          return renderStoreBlock(block);
      default:
        return null;
    }
  };

  const renderBaseBlock = (block: Block) => (
    <div className="flex flex-row items-center" key={block.index}>
      <BaseBlock index={block.index} color={"lightgrey"} />
      {block.index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderInputBlock = (block: Block) => (
    <div className="flex flex-row items-center" key={block.index}>
      <InputBlock block={block} />
      {block.index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderOutputBlock = (block: Block) => (
      <div className="flex flex-row items-center" key={block.index}>
        <OutputBlock block={block} />
        {block.index !== blocks.length - 1 && <Arrow />}
      </div>
  );

  const renderMoveBlock = (block: Block) => (
    <div className="flex flex-row items-center" key={block.index}>
      <MoveBlock block={block} />
      {block.index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderMergeBlock = (block: Block) => (
    <div className="flex flex-row items-center" key={block.index}>
      <MergeBlock block={block} />
      {block.index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderSplitBlock = (block: Block) => (
    <div className="flex flex-row items-center" key={block.index}>
      <SplitBlock block={block} />
      {block.index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderMixBlock = (block: Block) => (
    <div className="flex flex-row items-center" key={block.index}>
      <MixBlock block={block} />
      {block.index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderStoreBlock = (block: Block) => (
    <div className="flex flex-row items-center" key={block.index}>
      <StoreBlock block={block} />
      {block.index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const Arrow = () => (
    <div className="flex items-center" data-testid="arrow">
      <ArrowForward />
    </div>
  );

  return (
    <div className="h-full w-full relative overflow-y-auto">
      <div className="flex flex-row flex-wrap" style={{margin: 10}}>
        {blocks.map((block) => renderBlock(block))}
      </div>
    </div>
  );
};

export default CodeCanvas;
