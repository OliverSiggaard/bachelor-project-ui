import React from 'react';
import {TextField} from "@mui/material";

interface DecimalInputProps {
  value: string;
  setValue: (value: string) => void;
  text?: string;
}

const DecimalInput: React.FC<DecimalInputProps> = ({value, setValue, text = "Value"}) => {
  const numberPattern = /^[0-9]*\.?[0-9]*$/;

  return (
    <div className="flex flex-row space-x-3">
      <TextField
        variant="outlined"
        label={text}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          if (numberPattern.test(value)) {
            setValue(value);
          }
        }}
      />
    </div>
  );
};

export default DecimalInput;