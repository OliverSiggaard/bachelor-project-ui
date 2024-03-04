import React from 'react';
import BaseBlock from "./BaseBlock";
import Move from '@mui/icons-material/OpenWith';
import {Divider, Typography} from "@mui/material";
import {Block, MoveBlockInfo} from "../../types/blockTypes";

interface MoveBlockProps {
    block: Block;
}

const MoveBlock: React.FC<MoveBlockProps> = ({ block }) => {
  const blockColor = "#AED8F2";

  let dropletID: string = '-';
  let posX: string = '-';
  let posY: string = '-';

  if (block.info !== undefined) {
    const info = block.info as MoveBlockInfo;
    dropletID = info.dropletID;
    posX = info.xPos;
    posY = info.yPos;
  }

  return (
    <BaseBlock index={block.index} color={blockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Move/>
        <span>Move</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col space-y-2.5">
          <span>ID:</span>
          <span>Pos:</span>
        </Typography>
        <Typography className="flex flex-col space-y-2.5 text-right">
          <span>{dropletID}</span>
          <span>({posX},{posY})</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default MoveBlock;