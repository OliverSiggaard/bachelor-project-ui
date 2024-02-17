import React from 'react';
import BaseBlock from "./BaseBlock";
import Input from '@mui/icons-material/Input';
import {Divider, Typography} from "@mui/material";
import {Block, InputBlockInfo} from "../../types/blockTypes";

interface InputBlockProps {
  block: Block;
}

const InputBlock: React.FC<InputBlockProps> = ({ block }) => {
  const inputBlockColor = "#D1EBD8";

  let dropletID: string = '-';
  let posX: string = '-';
  let posY: string = '-';
  let volume: string = '-';

  if (block.info && 'volume' in block.info) {
    const info = block.info as InputBlockInfo;
    dropletID = info.dropletID;
    posX = info.posX;
    posY = info.posY;
    volume = info.volume;
  }

  return (
    <BaseBlock index={block.index} color={inputBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Input/>
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
          <span>{dropletID}</span>
          <span>({posX},{posY})</span>
          <span>{volume}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default InputBlock;