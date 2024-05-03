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
import {TextColors} from "../../../enums/textColors";

interface CompilationErrorDialogProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  allowPartialDownload: boolean;
  error: string;
}

const CompilationErrorDialog: React.FC<CompilationErrorDialogProps> = ({ open, onClose, onDownload, allowPartialDownload, error }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {"The following error occurred while compiling the program:"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div style={{color: TextColors.errorText, marginBottom: "15px", fontStyle: "italic"}}>
            "{error}"
          </div>
          <Divider/>
          <div style={{marginTop: "15px"}}>
            {allowPartialDownload ? (
              "You can still download the partial program and try to debug the error."
            ) : (
              "Download of the partial program is not possible."
            )}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!allowPartialDownload}
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