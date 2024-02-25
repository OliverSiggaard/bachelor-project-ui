import React from 'react';
import BaseBlock from "./BaseBlock";
import Merge from '@mui/icons-material/Merge';
import {Divider, Typography} from "@mui/material";
import {Block, MergeBlockInfo, OutputBlockInfo} from "../../types/blockTypes";

interface MergeBlockProps {
  block: Block;
}

const MergeBlock: React.FC<MergeBlockProps> = ({ block }) => {
  const blockColor = "#F2A477";

  let resultDropletID: string = '-';
  let dropletID1: string = '-';
  let dropletID2: string = '-';
  let posX: string = '-';
  let posY: string = '-';

  if (block.info !== undefined) {
    const info = block.info as MergeBlockInfo;
    resultDropletID = info.resultDropletID;
    dropletID1 = info.dropletID1;
    dropletID2 = info.dropletID2;
    posX = info.posX;
    posY = info.posY;
  }



  return (
    <BaseBlock index={block.index} color={blockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Merge/>
        <span>Merge</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>Result ID:</span>
          <span>Droplet 1:</span>
          <span>Droplet 2:</span>
          <span>Pos:</span>

        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{resultDropletID}</span>
          <span>{dropletID1}</span>
          <span>{dropletID2}</span>
          <span>({posX},{posY})</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default MergeBlock;