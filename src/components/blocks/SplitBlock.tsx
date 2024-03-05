import React from 'react';
import BaseBlock from "./BaseBlock";
import Split from '@mui/icons-material/CallSplit';
import {Divider, Typography} from "@mui/material";
import {Block, SplitBlockInfo} from "../../types/blockTypes";

interface SplitBlockProps {
  block: Block;
}

const SplitBlock: React.FC<SplitBlockProps> = ({ block }) => {
  const blockColor = "#F0BC68";

  let originDropletId: string = '-';
  let resultDropletID1: string = '-';
  let resultDropletID2: string = '-';
  let ratio: string = '-';
  let xPos1: string = '-';
  let yPos1: string = '-';
  let xPos2: string = '-';
  let yPos2: string = '-';

  if (block.info !== undefined) {
    const info = block.info as SplitBlockInfo;
    originDropletId = info.originDropletID;
    resultDropletID1 = info.resultDropletID1;
    resultDropletID2 = info.resultDropletID2;
    ratio = info.ratio;
    xPos1 = info.xPos1;
    yPos1 = info.yPos1;
    xPos2 = info.xPos2;
    yPos2 = info.yPos2;

  }



  return (
    <BaseBlock index={block.index} color={blockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Split/>
        <span>Split</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "7px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>Origin ID:</span>
          <span>Drop 1</span>
          <span>{resultDropletID1}</span>
          <span>({xPos1},{yPos1}) {ratio}</span>

        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{originDropletId}</span>
          <span>Drop 2</span>
          <span>{resultDropletID2}</span>
          <span>({xPos2},{yPos2}) {ratio}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default SplitBlock;