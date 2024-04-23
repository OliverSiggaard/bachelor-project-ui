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

  const info = block.info as StoreBlockInfo;

  const dropletId: string = info?.dropletId || "-";
  const posX: string = info?.posX || "-";
  const posY: string = info?.posY || "-";
  const time: string = info?.time || "-";

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
          <span>{time} ms</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default StoreBlock;