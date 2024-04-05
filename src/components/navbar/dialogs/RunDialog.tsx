import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

interface RunDialogProps {
  open: boolean;
  onClose: () => void;
  onRun: () => void;
  loading: boolean;
}

const RunDialog: React.FC<RunDialogProps> = ({ open, onClose, onRun }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {"Download compiled program?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your program will be sent to the backend, where it will be compiled into BioAssembly.
          Upon successful compilation, an automatic download of the compiled program will start.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {onClose(); onRun()}}
          color="success"
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RunDialog;