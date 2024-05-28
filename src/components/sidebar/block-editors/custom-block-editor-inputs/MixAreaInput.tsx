import React from 'react';
import {TextField} from "@mui/material";

interface MixAreaInputProps {
  sizeX: string;
  sizeY: string;
  setSizeX: (sizeX: string) => void;
  setSizeY: (sizeY: string) => void;
  textSizeX?: string;
  textSizeY?: string;
}

const MixAreaInput: React.FC<MixAreaInputProps> = ({
  sizeX,
  sizeY,
  setSizeX,
  setSizeY,
  textSizeX = "x-Size",
  textSizeY = "y-Size"
}) => {
  const numberPattern = /^(?!0+$)[0-9]*$/;

  return (
    <div className="flex flex-row space-x-3">
      <TextField
        variant="outlined"
        label={textSizeX}
        value={sizeX}
        onChange={(e) => {
          const value = e.target.value;
          if (numberPattern.test(value)) {
            setSizeX(value);
          }
        }}
      />
      <TextField
        variant="outlined"
        label={textSizeY}
        value={sizeY}
        onChange={(e) => {
          const value = e.target.value;
          if (numberPattern.test(value)) {
            setSizeY(value);
          }
        }}
      />
    </div>
  );
};

export default MixAreaInput;