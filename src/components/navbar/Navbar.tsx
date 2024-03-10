import React, {useState} from 'react';
import {
  AppBar,
  Box,
  IconButton, LinearProgress,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import {DeleteForever, SendRounded} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {deleteAll} from "../../redux/reducers/blockReducer";
import DeleteDialog from "./dialogs/DeleteDialog";
import RunDialog from "./dialogs/RunDialog";
import api from "../../api/axiosConfig";
import {Block} from "../../types/blockTypes";
import {convertBlocksToActions} from "../../conversion/blocksToActionsConverter";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const openDeleteDialog = () => { setDeleteDialogOpen(true) };
  const closeDeleteDialog = () => { setDeleteDialogOpen(false) };

  const [runDialogOpen, setRunDialogOpen] = useState(false);
  const openRunDialog = () => { setRunDialogOpen(true) };
  const closeRunDialog = () => { setRunDialogOpen(false) };

  const [loading, setLoading] = useState(false);

  const sendProgramToBackend = async () => {
    setLoading(true);
    const programActions = convertBlocksToActions(blocks);
    try {
      const response = await api.post(
        "/api/program",
        programActions,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={openDeleteDialog}
          >
            <DeleteForever sx={{fontSize: "26px"}}/>
          </IconButton>
        </Tooltip>
        <div style={{width: 5}}/>
        <Tooltip title={"Compile Program"}>
          <IconButton
            size="large"
            color="inherit"
            disabled={loading}
            onClick={openRunDialog}
          >
            <SendRounded sx={{fontSize: "26px"}} />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={() => dispatch(deleteAll())}
      />
      <RunDialog
        open={runDialogOpen}
        onClose={closeRunDialog}
        onRun={() => sendProgramToBackend()}
        loading={loading}
      />
      {loading && (
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 260 }}>
          <Typography className="flex flex-col space-y-1 text-center" color="textSecondary">
            <span>Compiling Program in Backend...</span>
            <LinearProgress />
          </Typography>
        </div>
      )}
    </AppBar>
  );
};

export default Navbar;