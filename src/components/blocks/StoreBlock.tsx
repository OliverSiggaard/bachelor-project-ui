import React from 'react';
import BaseBlock from "./BaseBlock";
import Store from '@mui/icons-material/HourglassTop';
import {Divider, Typography} from "@mui/material";
import {Block, StoreBlockInfo} from "../../types/blockTypes";

interface StoreBlockProps {
  block: Block;
  draggable?: boolean;
  onClick?: () => void;
}

const StoreBlock: React.FC<StoreBlockProps> = ({ block, draggable = true, onClick }) => {
  const blockColor = "#F2DEA2";

  let dropletID: string = '-';
  let xPos: string = '-';
  let yPos: string = '-';
  let time: string = '-';

  if (block.info !== undefined) {
    const info = block.info as StoreBlockInfo;
    dropletID = info.dropletID;
    xPos = info.xPos;
    yPos = info.yPos;
    time = info.time + "ms";
  }

  return (
    <BaseBlock index={block.index} color={blockColor} draggable={draggable} onClick={onClick}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Store/>
        <span>Store</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>ID:</span>
          <span>Pos:</span>
          <span>Time:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{dropletID}</span>
          <span>({xPos},{yPos})</span>
          <span>{time}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default StoreBlock;