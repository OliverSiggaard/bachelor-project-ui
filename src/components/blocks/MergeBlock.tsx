import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, MergeBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";

interface MergeBlockProps {
  block: Block;
}

const MergeBlock: React.FC<MergeBlockProps> = ({ block }) => {

  const info = block.info as MergeBlockInfo;

  const resultDropletId: string = info?.resultDropletId || "-";
  const dropletId1: string = info?.originDropletId1 || "-";
  const dropletId2: string = info?.originDropletId2 || "-";
  const posX: string = info?.posX || "-";
  const posY: string = info?.posY || "-";

  return (
    <BaseBlock index={block.index} color={BlockColors.MergeBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.MergeBlockIcon}
        <span>Merge</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "7px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>Drop 1:</span>
          <span>Drop 2:</span>
          <span>Res ID:</span>
          <span>Pos:</span>

        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{dropletId1}</span>
          <span>{dropletId2}</span>
          <span>{resultDropletId}</span>
          <span>({posX},{posY})</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default MergeBlock;