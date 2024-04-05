import React, {useState} from 'react';
import {Alert, AppBar, Box, IconButton, LinearProgress, Snackbar, Toolbar, Tooltip, Typography} from "@mui/material";
import {DeleteForever, Download} from "@mui/icons-material";
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

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const sendProgramToBackend = async () => {
    setLoading(true);
    const programActions = convertBlocksToActions(blocks);
    try {
      const response = await api.post(
        "/api/compile",
        programActions,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      console.log("Data sent successfully:", response.status);
      downloadCompiledProgram(response.data);
      if (response.status === 200) {
        setSuccess(true);
      } else if (response.status === 400) {
        setSuccess(false);
      }

    } catch (error) {
      setSuccess(false);
      console.error("Error sending data:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCompiledProgram = (data: BlobPart) => {
    const blob = new Blob([data], { type: 'text-plain' });
    const url = window.URL.createObjectURL(blob);
    const fileName = getFileName();
    downloadFile(url, fileName);
  }

  const getFileName = () => {
    const currentTime = new Date().toLocaleTimeString('da-DK').replaceAll(".", "");
    return `compiled_program_${currentTime}.basm`;
  }

  // Create a hidden anchor element and trigger download
  const downloadFile = (url: string, fileName: string) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url); // Clean up
  }

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
        <Tooltip title={"Download Compiled Program"}>
          <IconButton
            size="large"
            color="inherit"
            disabled={loading}
            onClick={openRunDialog}
          >
            <Download sx={{fontSize: "26px"}} />
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
      {success !== undefined && (
        <Snackbar open={true} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <Alert
            onClose={() => setSuccess(undefined)}
            sx={{width: "100%"}}
            severity={success ? "success" : "error"}
          >
            {success ? "Program compiled successfully!" : "Program compilation failed!"}
          </Alert>
        </Snackbar>
      )};
    </AppBar>
  );
};

export default Navbar;