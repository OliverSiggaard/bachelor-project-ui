import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider
} from "@mui/material";

interface CompilationErrorDialogProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  error: string;
}

const CompilationErrorDialog: React.FC<CompilationErrorDialogProps> = ({ open, onClose, onDownload, error }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {"The following error occurred while compiling the program:"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p style={{ color: 'red', marginBottom: "15px"}}>
            {error}
          </p>
          <Divider />
          <p style={{marginTop: "15px"}}>
            You can still download the partial program and try to debug the error.
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => { onClose(); onDownload(); }}
          color="error"
        >
          Download Partial Program
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompilationErrorDialog;