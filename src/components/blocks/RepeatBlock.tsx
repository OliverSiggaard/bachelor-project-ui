import React from 'react';
import BaseBlock from "./BaseBlock";
import Repeat from '@mui/icons-material/Repeat';
import {Divider, Typography} from "@mui/material";
import {Block, RepeatBlockInfo} from "../../types/blockTypes";

interface RepeatBlockProps {
  block: Block;
  draggable?: boolean;
  onClick?: () => void;
}

const RepeatBlock: React.FC<RepeatBlockProps> = ({ block, draggable = true, onClick }) => {
  const blockColor = "#8596A6";

  let times: string = '-';

  if (block.info !== undefined) {
    const info = block.info as RepeatBlockInfo;
    times = info.times + "times";
  }

  return (
    <BaseBlock index={block.index} color={blockColor} draggable={draggable} onClick={onClick}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Repeat/>
        <span>Repeat</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>Repeat:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{times}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default RepeatBlock;