import React from 'react';
import {TextField} from "@mui/material";

interface VolumeInputProps {
  volume: string;
  setVolume: (volume: string) => void;
  text?: string;
}

const VolumeInput: React.FC<VolumeInputProps> = ({volume, setVolume, text = "Volume (µl)"}) => {
  const numberPattern = /^[0-9]*\.?[0-9]*$/;

  return (
    <div className="flex flex-row space-x-3">
      <TextField
        variant="outlined"
        label={text}
        value={volume}
        onChange={(e) => {
          const value = e.target.value;
          if (numberPattern.test(value)) {
            setVolume(value);
          }
        }}
      />
    </div>
  );
};

export default VolumeInput;