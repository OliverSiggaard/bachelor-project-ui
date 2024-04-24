import React from 'react';
import {TextField} from "@mui/material";

interface PositionInputProps {
  posX: string;
  posY: string;
  setPosX: (pos: string) => void;
  setPosY: (pos: string) => void;
  textPosX?: string;
  textPosY?: string;
}

const AutocompleteDropletId: React.FC<PositionInputProps> = ({
  posX,
  posY,
  setPosX,
  setPosY,
  textPosX = "x-Pos",
  textPosY = "y-Pos"
}) => {
  const numberPattern = /^[0-9]*$/;

  return (
    <div className="flex flex-row space-x-3">
      <TextField
        variant="outlined"
        label={textPosX}
        value={posX}
        onChange={(e) => {
          const value = e.target.value;
          if (numberPattern.test(value)) {
            setPosX(value);
          }
        }}
      />
      <TextField
        variant="outlined"
        label={textPosY}
        value={posY}
        onChange={(e) => {
          const value = e.target.value;
          if (numberPattern.test(value)) {
            setPosY(value);
          }
        }}
      />
    </div>
  );
};

export default AutocompleteDropletId;