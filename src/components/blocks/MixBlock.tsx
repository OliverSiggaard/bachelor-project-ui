import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, MixBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";

interface MixBlockProps {
  block: Block;
}

const MixBlock: React.FC<MixBlockProps> = ({ block }) => {

  let dropletId: string = '-';
  let posX: string = '-';
  let posY: string = '-';
  let xSize: string = '-';
  let ySize: string = '-';


  if (block.info !== undefined) {
    const info = block.info as MixBlockInfo;
    dropletId = info.dropletId;
    posX = info.posX;
    posY = info.posY;
    xSize = info.xSize;
    ySize = info.ySize;
  }

  return (
    <BaseBlock index={block.index} color={BlockColors.MixBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.MixBlockIcon}
        <span>Mix</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px"}}>
        <Typography className="flex flex-col justify-between">
          <span>ID:</span>
          <span>Pos:</span>
          <span>Size:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{dropletId}</span>
          <span>({posX},{posY})</span>
          <span>{xSize} x {ySize}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default MixBlock;