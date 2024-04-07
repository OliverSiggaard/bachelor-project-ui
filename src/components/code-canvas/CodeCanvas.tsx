import React from 'react';
import BaseBlock from "../blocks/BaseBlock";
import {useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";
import {ArrowForward} from "@mui/icons-material";
import InputBlock from "../blocks/input-block/InputBlock";
import OutputBlock from "../blocks/OutputBlock";
import MoveBlock from "../blocks/MoveBlock";
import MergeBlock from "../blocks/MergeBlock";
import SplitBlock from '../blocks/SplitBlock';
import MixBlock from '../blocks/MixBlock';
import StoreBlock from "../blocks/StoreBlock";
import IfBlock from "../blocks/IfBlock";
import RepeatBlock from "../blocks/RepeatBlock";

const CodeCanvas: React.FC = () => {
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'base':
        return renderBaseBlock(block, index);
      case 'input':
        return renderInputBlock(block, index);
      case 'output':
          return renderOutputBlock(block, index);
      case 'move':
          return renderMoveBlock(block, index);
      case 'merge':
          return renderMergeBlock(block, index);
      case 'split':
          return renderSplitBlock(block, index);
      case 'mix':
          return renderMixBlock(block, index);
      case 'store':
          return renderStoreBlock(block, index);
      case 'if':
          return renderIfBlock(block, index);
      case 'repeat':
          return renderRepeatBlock(block, index);
      default:
        return null;
    }
  };

  const renderBaseBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <BaseBlock index={block.index} color={"lightgrey"} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderInputBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <InputBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderOutputBlock = (block: Block, index: number) => (
      <div className="flex flex-row items-center" key={index}>
        <OutputBlock block={block} />
        {index !== blocks.length - 1 && <Arrow />}
      </div>
  );

  const renderMoveBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <MoveBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderMergeBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <MergeBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderSplitBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <SplitBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderMixBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <MixBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderStoreBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <StoreBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderIfBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <IfBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const renderRepeatBlock = (block: Block, index: number) => (
    <div className="flex flex-row items-center" key={index}>
      <RepeatBlock block={block} />
      {index !== blocks.length - 1 && <Arrow />}
    </div>
  );

  const Arrow = () => (
    <div className="flex items-center">
      <ArrowForward />
    </div>
  );

  return (
    <div className="h-full w-full relative overflow-y-auto">
      <div className="flex flex-row flex-wrap" style={{margin: 10}}>
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
};

export default CodeCanvas;
