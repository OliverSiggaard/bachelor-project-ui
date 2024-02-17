import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onRun: () => void;
}

const RunDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onRun }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {"Run program on DMF Biochip?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your program will be compiled with the help of advanced algorithms and then run on the DMF Biochip.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => { onClose(); onRun(); }}
          color="success"
        >
          Run
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RunDialog;