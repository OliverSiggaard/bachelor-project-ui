import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, SplitBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";
import AvailableDropletIdDisplay from "./custom-block-information-displays/AvailableDropletIdDisplay";

interface SplitBlockProps {
  block: Block;
}

const SplitBlock: React.FC<SplitBlockProps> = ({ block }) => {

  const info = block.info as SplitBlockInfo;

  const resultDropletId1: string = info?.resultDropletId1 || "-";
  const resultDropletId2: string = info?.resultDropletId2 || "-";
  const posX1: string = info?.posX1 || "-";
  const posY1: string = info?.posY1 || "-";
  const posX2: string = info?.posX2 || "-";
  const posY2: string = info?.posY2 || "-";

  return (
    <BaseBlock index={block.index} color={BlockColors.SplitBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.SplitBlockIcon}
        <span>Split</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "95px", display: "flex", justifyContent: "space-between", margin: "7px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between overflow-hidden whitespace-nowrap" style={{marginRight: "10px"}}>
          <span>Orig ID:</span>
          <span>Res 1:</span>
          <span>{resultDropletId1}</span>
          <span>({posX1},{posY1})</span>

        </Typography>
        <Typography className="flex flex-col justify-between text-right overflow-hidden whitespace-nowrap">
          <AvailableDropletIdDisplay block={block} />
          <span>Res 2:</span>
          <span>{resultDropletId2}</span>
          <span>({posX2},{posY2})</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default SplitBlock;