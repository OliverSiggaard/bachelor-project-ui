import React from 'react';
import {TextField} from "@mui/material";

interface TimeInputProps {
  time: string;
  setTime: (time: string) => void;
  text?: string;
}

const TimeInput: React.FC<TimeInputProps> = ({time, setTime, text = "Time (ms)"}) => {
  const numberPattern = /^[0-9]*$/;

  return (
    <div className="flex flex-row space-x-3">
      <TextField
        variant="outlined"
        label={text}
        value={time}
        onChange={(e) => {
          const value = e.target.value;
          if (numberPattern.test(value)) {
            setTime(value);
          }
        }}
      />
    </div>
  );
};

export default TimeInput;