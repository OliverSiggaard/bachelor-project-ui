import React, {useState} from 'react';
import {
  Alert,
  AppBar,
  Box,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import {DeleteForever, Download, MoreVert, Save, UploadFile} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {deleteAll, overwriteBlocks} from "../../redux/blockReducer";
import DeleteDialog from "./dialogs/DeleteDialog";
import RunDialog from "./dialogs/RunDialog";
import {Block} from "../../types/blockTypes";
import {convertBlocksToActions} from "../../conversion/blocksToActionsConverter";
import {useApiCall} from "../../api/useApiCall";
import {
  downloadFile,
  getCompiledProgramFileName,
  getDmfConfigurationFileName,
  getProgramSketchFileName,
} from "../../utils/fileUtils";
import {validateUploadedBlocks} from "../../utils/programSketchUtils";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const openDeleteDialog = () => { setDeleteDialogOpen(true) };
  const closeDeleteDialog = () => { setDeleteDialogOpen(false) };

  // Run dialog
  const [runDialogOpen, setRunDialogOpen] = useState<boolean>(false);
  const openRunDialog = () => { setRunDialogOpen(true) };
  const closeRunDialog = () => { setRunDialogOpen(false) };

  // Dropdown menu
  const [dropdownMenuAnchorEl, setDropdownMenuAnchorEl] = useState<null | HTMLElement>(null);
  const openDropdownMenu = (e: React.MouseEvent<HTMLButtonElement>) => { setDropdownMenuAnchorEl(e.currentTarget) };
  const closeDropdownMenu = () => { setDropdownMenuAnchorEl(null) };


  const [compilationStatusSnackbarOpen, setCompilationStatusSnackbarOpen] = useState<boolean>(false);

  const { loading, success, sendRequest } = useApiCall();



  const handleSendProgramToBackend = async () => {
    try {
      const programActions = convertBlocksToActions(blocks);
      const executionResult = await sendRequest(
        "/api/compile",
        "POST",
        programActions,
        {
          "Content-Type": "application/json",
        }
      );
      // Extract the compiled program and dmf configuration from the response (should match the backends execution result)
      const compiledProgram = executionResult.compiledProgram;
      const dmfConfiguration = JSON.stringify(executionResult.dmfConfiguration, null, 2);

      // Initiate automatic download of the compiled program and dmf configuration
      downloadFile(compiledProgram, getCompiledProgramFileName(), "text-plain");
      downloadFile(dmfConfiguration, getDmfConfigurationFileName(), "application/json");
    } catch (error) {
      console.error("An error occurred while sending the program to the backend:", error);
    } finally {
      setCompilationStatusSnackbarOpen(true);
    }
  }

  const downloadProgramSketch = () => {
    downloadFile(JSON.stringify(blocks, null, 2), getProgramSketchFileName(), "application/json");
  }

  const uploadProgramSketch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        if (validateUploadedBlocks(fileContent) === true) {
          dispatch(overwriteBlocks(JSON.parse(fileContent) as Block[]));
        } else {
          alert(validateUploadedBlocks(fileContent));
        }
      }
      reader.readAsText(file);
    }
  }

  return (
    <AppBar position="static" sx={{height: '64px'}}>
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{fontWeight: "bold"}}
        >
          DMF-Programmer
        </Typography>
        <Box sx={{flexGrow: 1}}/>
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
            <Download sx={{fontSize: "26px"}}/>
          </IconButton>
        </Tooltip>
        <Tooltip title={"More"}>
          <IconButton
            size="large"
            color="inherit"
            onClick={openDropdownMenu}
          >
            <MoreVert sx={{fontSize: "26px"}}/>
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Menu
        open={Boolean(dropdownMenuAnchorEl)}
        anchorEl={dropdownMenuAnchorEl}
        onClose={closeDropdownMenu}
      >
        <input
          type="file"
          accept="application/json"
          id="uploadProgramSketch"
          multiple={false}
          onChange={(e) => {uploadProgramSketch(e); closeDropdownMenu();}}
          hidden
        />
        <label htmlFor="uploadProgramSketch" style={{cursor: "pointer", width: "100%", height: "100%"}}>
          <MenuItem>
            <ListItemIcon>
              <UploadFile/>
            </ListItemIcon>
            <ListItemText>Upload Program Sketch</ListItemText>
          </MenuItem>
        </label>
        <MenuItem onClick={() => {downloadProgramSketch(); closeDropdownMenu()}}>
          <ListItemIcon>
            <Save/>
          </ListItemIcon>
          <ListItemText>Download Program Sketch</ListItemText>
        </MenuItem>
      </Menu>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={() => dispatch(deleteAll())}
      />
      <RunDialog
        open={runDialogOpen}
        onClose={closeRunDialog}
        onRun={() => handleSendProgramToBackend()}
        loading={loading}
      />
      {loading && (
        <div style={{position: 'absolute', bottom: 20, right: 20, width: 260}}>
          <Typography className="flex flex-col space-y-1 text-center" color="textSecondary">
            <span>Compiling Program in Backend...</span>
            <LinearProgress/>
          </Typography>
        </div>
      )}
      <Snackbar open={compilationStatusSnackbarOpen} anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
        <Alert
          onClose={() => setCompilationStatusSnackbarOpen(false)}
          sx={{width: "100%"}}
          severity={success ? "success" : "error"}
        >
          {success ? "Program compiled successfully!" : "Program compilation failed!"}
        </Alert>
      </Snackbar>
    </AppBar>
  );
};

export default Navbar;