import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, InputBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";

interface InputBlockProps {
  block: Block;
}

const InputBlock: React.FC<InputBlockProps> = ({ block }) => {

  const info = block.info as InputBlockInfo;

  const dropletId: string = info?.dropletId || "-";
  const posX: string = info?.posX || "-";
  const posY: string = info?.posY || "-";
  const volume: string = info?.volume || "-";

  return (
    <BaseBlock index={block.index} color={BlockColors.InputBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.InputBlockIcon}
        <span>Input</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>ID:</span>
          <span>Pos:</span>
          <span>Vol:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{dropletId}</span>
          <span>({posX},{posY})</span>
          <span>{volume} µl</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default InputBlock;