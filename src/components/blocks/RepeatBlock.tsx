import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, RepeatBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";

interface RepeatBlockProps {
  block: Block;
}

const RepeatBlock: React.FC<RepeatBlockProps> = ({ block }) => {

  const info = block.info as RepeatBlockInfo;

  const times = info?.times || "-";

  return (
    <BaseBlock index={block.index} color={BlockColors.RepeatBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.RepeatBlockIcon}
        <span>Repeat</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>Repeat:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{times} times</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default RepeatBlock;