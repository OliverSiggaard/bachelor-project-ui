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
  );
};

export default TimeInput;