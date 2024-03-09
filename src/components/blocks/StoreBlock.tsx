import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, StoreBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";

interface StoreBlockProps {
  block: Block;
}

const StoreBlock: React.FC<StoreBlockProps> = ({ block }) => {

  let dropletId: string = '-';
  let posX: string = '-';
  let posY: string = '-';
  let time: string = '-';

  if (block.info !== undefined) {
    const info = block.info as StoreBlockInfo;
    dropletId = info.dropletId;
    posX = info.posX;
    posY = info.posY;
    time = info.time + " ms";
  }

  return (
    <BaseBlock index={block.index} color={BlockColors.StoreBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.StoreBlockIcon}
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
          <span>{dropletId}</span>
          <span>({posX},{posY})</span>
          <span>{time}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default StoreBlock;