import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, OutputBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";

interface OutputBlockProps {
    block: Block;
}

const OutputBlock: React.FC<OutputBlockProps> = ({ block }) => {

  const info = block.info as OutputBlockInfo;

  const dropletId: string = info?.dropletId || "-";
  const posX: string = info?.posX || "-";
  const posY: string = info?.posY || "-";

  return (
    <BaseBlock index={block.index} color={BlockColors.OutputBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.OutputBlockIcon}
        <span>Output</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col space-y-2.5">
          <span>ID:</span>
          <span>Pos:</span>
        </Typography>
        <Typography className="flex flex-col space-y-2.5 text-right">
          <span>{dropletId}</span>
          <span>({posX},{posY})</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default OutputBlock;