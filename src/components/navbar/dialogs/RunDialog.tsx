import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import api from "../../../api/axiosConfig";

interface RunDialogProps {
  open: boolean;
  onClose: () => void;
}

const RunDialog: React.FC<RunDialogProps> = ({ open, onClose }) => {


  const sendDataToBackend = async () => {
    try {
      const response = await api.post(
        "/api/program",
        { message: "Hello from React!" },
        {
          headers: {
            "Content-Type": "application/json", // Assuming you're sending JSON data
            // Add any other headers if required
          }
        }
      );
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

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
          onClick={() => {onClose(); sendDataToBackend()}}
          color="success"
        >
          Run
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RunDialog;