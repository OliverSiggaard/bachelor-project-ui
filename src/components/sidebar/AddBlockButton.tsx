import React, {ReactNode} from 'react';
import {Button, darken, Typography} from "@mui/material";

interface AddBlockButtonProps {
  color: string;
  icon: ReactNode;
  text: string;
  onClick: () => void;
}

const AddBlockButton: React.FC<AddBlockButtonProps> = ({ color, icon, text, onClick }) => {

  const hoverColor = darken(color, 0.1);

  return (
    <Button
      variant="contained"
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: color,
        color: "inherit",
        minWidth: 200,
        maxWidth: 200,
        minHeight: 55,
        maxHeight: 55,
        '&:hover': { backgroundColor: hoverColor },
      }}
      onClick={onClick}
    >
      <Typography className="grid grid-cols-12 space-x-1">
        {icon}
        <span className="col-span-1" />
        <span className="col-span-10">{text}</span>
      </Typography>
    </Button>
  );
};

export default AddBlockButton;