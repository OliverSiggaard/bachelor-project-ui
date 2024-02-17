import React, {useState} from 'react';
import {
  AppBar,
  Box, Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import {DeleteForever, PlayArrow} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {deleteAll} from "../redux/reducers/blockReducer";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const openDeleteConfirmation = () => { setDeleteDialogOpen(true) };
  const closeDeleteConfirmation = () => { setDeleteDialogOpen(false) };

  return (
    <AppBar position="static" sx={{ height: '64px' }}>
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          DMFB-Programmer
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip title={"Delete All"}>
          <IconButton
            size="large"
            color="inherit"
            onClick={openDeleteConfirmation}
          >
            <DeleteForever sx={{fontSize: "28px"}}/>
          </IconButton>
        </Tooltip>
        <div style={{width: 5}}/>
        <Tooltip title={"Run Program"}>
          <IconButton
            size="large"
            color="inherit"
          >
            <PlayArrow sx={{fontSize: "28px"}}/>
          </IconButton>
        </Tooltip>
      </Toolbar>

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteConfirmation}
      >
        <DialogTitle>
          {"Delete all blocks?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting all blocks will clear the code canvas.
            Once all blocks have been deleted there is no going back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeDeleteConfirmation}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => { closeDeleteConfirmation(); dispatch(deleteAll()); }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </AppBar>
  );
};

export default Navbar;