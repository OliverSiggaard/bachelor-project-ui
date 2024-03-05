import React from 'react';
import BaseBlock from "./BaseBlock";
import Output from '@mui/icons-material/Output';
import {Divider, Typography} from "@mui/material";
import {Block, OutputBlockInfo} from "../../types/blockTypes";

interface OutputBlockProps {
    block: Block;
}

const OutputBlock: React.FC<OutputBlockProps> = ({ block }) => {
  const blockColor = "#F2CDC4";

  let dropletID: string = '-';
  let xPos: string = '-';
  let yPos: string = '-';

  if (block.info !== undefined) {
    const info = block.info as OutputBlockInfo;
    dropletID = info.dropletID;
    xPos = info.xPos;
    yPos = info.yPos;
  }

  return (
    <BaseBlock index={block.index} color={blockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Output/>
        <span>Output</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col space-y-2.5">
          <span>ID:</span>
          <span>Pos:</span>
        </Typography>
        <Typography className="flex flex-col space-y-2.5 text-right">
          <span>{dropletID}</span>
          <span>({xPos},{yPos})</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default OutputBlock;