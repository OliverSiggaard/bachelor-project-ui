import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, SplitBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";

interface SplitBlockProps {
  block: Block;
}

const SplitBlock: React.FC<SplitBlockProps> = ({ block }) => {

  let originDropletId: string = '-';
  let resultDropletId1: string = '-';
  let resultDropletId2: string = '-';
  let ratio: string = '-';
  let posX1: string = '-';
  let posY1: string = '-';
  let posX2: string = '-';
  let posY2: string = '-';

  if (block.info !== undefined) {
    const info = block.info as SplitBlockInfo;
    originDropletId = info.originDropletId;
    resultDropletId1 = info.resultDropletId1;
    resultDropletId2 = info.resultDropletId2;
    ratio = info.ratio;
    posX1 = info.posX1;
    posY1 = info.posY1;
    posX2 = info.posX2;
    posY2 = info.posY2;
  }

  return (
    <BaseBlock index={block.index} color={BlockColors.SplitBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.SplitBlockIcon}
        <span>Split</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "7px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>Origin ID:</span>
          <span>Drop 1</span>
          <span>{resultDropletId1}</span>
          <span>({posX1},{posY1}) {ratio}</span>

        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{originDropletId}</span>
          <span>Drop 2</span>
          <span>{resultDropletId2}</span>
          <span>({posX2},{posY2}) {ratio}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default SplitBlock;