import React from 'react';
import BaseBlock from "./BaseBlock";
import If from '@mui/icons-material/QuestionMark';
import {Divider, Typography} from "@mui/material";
import {Block, IfBlockInfo} from "../../types/blockTypes";

interface IfBlockProps {
  block: Block;
}

const IfBlock: React.FC<IfBlockProps> = ({ block }) => {
  const blockColor = "#F2F2F2";

  let condition: string = '-';

  if (block.info !== undefined) {
    const info = block.info as IfBlockInfo;
    condition = info.condition;
  }

  return (
    <BaseBlock index={block.index} color={blockColor}>
      <Typography sx={{ display: "flex", justifyContent: "space-between", margin: "10px 10px 0 10px" }}>
        <If/>
        <span>If</span>
      </Typography>
      <Divider orientation="horizontal" flexItem sx={{borderWidth: "1px", backgroundColor: "#242424", margin: "5px"}}/>
      <div style={{ height: "90px", display: "flex", justifyContent: "space-between", margin: "10px 10px 10px 10px" }}>
        <Typography className="flex flex-col justify-between">
          <span>Condition:</span>
        </Typography>
        <Typography className="flex flex-col justify-between text-right">
          <span>{condition}</span>
        </Typography>
      </div>
    </BaseBlock>
  );
};

export default IfBlock;