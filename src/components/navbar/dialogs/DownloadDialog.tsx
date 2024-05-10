import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Divider
} from "@mui/material";
import {Info} from "@mui/icons-material";

interface DownloadDialogProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  loading: boolean;
}

const DownloadDialog: React.FC<DownloadDialogProps> = ({ open, onClose, onDownload }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {"Download compiled program?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{marginBottom: "15px"}}>
          Your program will be sent to the backend, where it will be compiled into BioAssembly.
          Upon successful compilation, an automatic download of the compiled program and the configuration file
          for the DMF platform will begin.
        </DialogContentText>
        <Divider/>
        <DialogContentText sx={{marginTop: "15px"}}>
          <Info sx={{fontSize: "20px"}} />
          <span style={{marginLeft: "5px", fontSize: "14px"}}>You might have to allow download of multiple files in your browser.</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {onClose(); onDownload()}}
          color="success"
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DownloadDialog;