import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";

interface CompilationErrorDialogProps {
  open: boolean;
  onClose: () => void;
  onRun: () => void;
  error: string;
}

const CompilationErrorDialog: React.FC<CompilationErrorDialogProps> = ({ open, onClose, onRun, error }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {"An error occurred while compiling the program."}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {error}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined"
                onClick={() => {onClose(); onRun()}}>
          Download partially compiled program files
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          color="error"
        >
          Edit program
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompilationErrorDialog;