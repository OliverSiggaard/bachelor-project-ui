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
  getProgramSketchFileName
} from "../../utils/fileUtils";
import CompilationErrorDialog from "./dialogs/CompilationErrorDialog";
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


  // API call (result, status, error)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [compilationStatusSnackbarOpen, setCompilationStatusSnackbarOpen] = useState<boolean>(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, success, sendRequest } = useApiCall();

  // Should match backends execution result
  interface ExecutionResult {
    compiledProgram: string;
    dmfConfiguration: JSON;
    errorMessage: string;
  }

  // Structure of the error response from the backend
  interface ApiErrorResponse {
    response?: {
      data?: ExecutionResult;
    }
  }

  const handleSendProgramToBackend = async () => {
    let result: any = undefined;
    setExecutionResult(null);
    try {
      const programActions = convertBlocksToActions(blocks);
      result = await sendRequest(
        "/api/compile",
        "POST",
        programActions,
        {
          "Content-Type": "application/json",
        }
      );
      handleDownloadFiles(result);
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      result = apiError?.response?.data;

      // Set error message to be displayed in the error dialog
      result?.errorMessage
        ? setErrorMessage(result.errorMessage)
        : setErrorMessage("An error occurred, but no error message was provided.");

      setIsErrorDialogOpen(true);
    } finally {
      setCompilationStatusSnackbarOpen(true);
      setExecutionResult(result);
    }
  }

  const handleDownloadFiles = (result: ExecutionResult) => {
    if (!result) return;

    // Extracting compiled program and dmf configuration from the response
    const compiledProgram = result.compiledProgram;
    const dmfConfiguration = JSON.stringify(result.dmfConfiguration, null, 2);

    // Initiating automatic browser download of compiled program and dmf configuration
    downloadFile(compiledProgram, getCompiledProgramFileName(), "text/plain");
    downloadFile(dmfConfiguration, getDmfConfigurationFileName(), "application/json");
  };

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

  // Allow partial download if compiled program is not empty or dmf configuration is not null
  const allowPartialDownload = executionResult?.compiledProgram !== "" || executionResult?.dmfConfiguration !== null;

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
      <CompilationErrorDialog
        open={isErrorDialogOpen}
        onClose={() => setIsErrorDialogOpen(false)}
        onDownload={() => handleDownloadFiles(executionResult as ExecutionResult)}
        allowPartialDownload={allowPartialDownload}
        error={errorMessage}
      />
    </AppBar>
  );
};

export default Navbar;