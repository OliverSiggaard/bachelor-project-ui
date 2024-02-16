import React from 'react';
import TestBlock from "../blocks/TestBlock";
import {useSelector} from "react-redux";
import {Block} from "../../types/blockTypes";
import {ArrowForward} from "@mui/icons-material";

const CodeCanvas: React.FC = () => {

  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);

  const renderBlock = (block: Block, index: number) => {
    return (
      <div className="flex flex-row items-center" key={index}>
        <TestBlock
          index={block.index}
          color={block.color}
        />
        {/* Arrows between blocks */}
        {index !== blocks.length - 1 && (
          <div className="flex items-center">
            <ArrowForward />
          </div>
        )
        }
      </div>
    )
  };

  return (
    <div className="h-full w-full relative overflow-y-auto" style={{ margin: 10 }}>
      <div className="flex flex-row flex-wrap">
        {blocks.map((block, i) => renderBlock(block, i))}
      </div>
    </div>
  );
};

export default CodeCanvas;
