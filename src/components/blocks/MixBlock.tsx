import React from 'react';
import BaseBlock from "./BaseBlock";
import Mix from '@mui/icons-material/Cached';
import {Divider, Typography} from "@mui/material";
import {Block, MixBlockInfo} from "../../types/blockTypes";

interface MixBlockProps {
  block: Block;
}

const MixBlock: React.FC<MixBlockProps> = ({ block }) => {
  const blockColor = "#F2DDD0";

  let dropletID: string = '-';

  if (block.info !== undefined) {
    const info = block.info as MixBlockInfo;
    dropletID = info.dropletID;
  }

  return (
    <BaseBlock index={block.index} color={blockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <Mix/>
        <span>Mix</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>ID:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{dropletID}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default MixBlock;