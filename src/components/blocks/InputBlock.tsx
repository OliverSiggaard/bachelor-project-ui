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
      <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: "10px 10px 0 10px" }}>
        <Input/>
        <span>Input</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: "0 10px 10px 10px" }}>
        <Typography sx={{display: 'flex', flexDirection: 'column'}}>
          <span>ID:</span>
          <span>(x,y):</span>
          <span>Vol:</span>
        </Typography>
        <Typography sx={{display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
          <span>{dropletID}</span>
          <span>({posX},{posY})</span>
          <span>{volume}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default InputBlock;