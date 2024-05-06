import React from 'react';
import BaseBlock from "./BaseBlock";
import {Divider, Typography} from "@mui/material";
import {Block, MixBlockInfo} from "../../types/blockTypes";
import {BlockColors} from "../../enums/blockColors";
import {BlockIcons} from "../../enums/BlockIcons";
import AvailableDropletIdDisplay from "./custom-block-information-displays/AvailableDropletIdDisplay";

interface MixBlockProps {
  block: Block;
}

const MixBlock: React.FC<MixBlockProps> = ({ block }) => {

  const info = block.info as MixBlockInfo;

  const posX: string = info?.posX || "-";
  const posY: string = info?.posY || "-";
  const xSize: string = info?.xSize || "-";
  const ySize: string = info?.ySize || "-";

  return (
    <BaseBlock index={block.index} color={BlockColors.MixBlockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        {BlockIcons.MixBlockIcon}
        <span>Mix</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px"}}>
        <Typography className="flex flex-col justify-between" style={{marginRight: "10px"}}>
          <span>ID:</span>
          <span>Pos:</span>
          <span>Size:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right overflow-hidden whitespace-nowrap">
          <AvailableDropletIdDisplay block={block} />
          <span>({posX},{posY})</span>
          <span>{xSize} x {ySize}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default MixBlock;