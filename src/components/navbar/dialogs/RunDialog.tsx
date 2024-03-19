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
        {"Compile Program to BioAssembly?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your program will be send to the backend, where it will be compiled with the help of algorithms, to then be converted to BioAssembly.
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
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RunDialog;