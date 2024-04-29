import React, {useState} from 'react';
import {Alert, AppBar, Box, IconButton, LinearProgress, Snackbar, Toolbar, Tooltip, Typography} from "@mui/material";
import {DeleteForever, Download} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {deleteAll} from "../../redux/blockReducer";
import DeleteDialog from "./dialogs/DeleteDialog";
import RunDialog from "./dialogs/RunDialog";
import {Block} from "../../types/blockTypes";
import {convertBlocksToActions} from "../../conversion/blocksToActionsConverter";
import {useApiCall} from "../../api/useApiCall";
import {downloadFile, getCompiledProgramFileName, getDmfConfigurationFileName} from "../../utils/fileUtils";
import CompilationErrorDialog from "./dialogs/CompilationErrorDialog";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const blocks = useSelector((state: { blocks: Block[] }) => state.blocks);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const openDeleteDialog = () => { setDeleteDialogOpen(true) };
  const closeDeleteDialog = () => { setDeleteDialogOpen(false) };

  const [runDialogOpen, setRunDialogOpen] = useState<boolean>(false);
  const openRunDialog = () => { setRunDialogOpen(true) };
  const closeRunDialog = () => { setRunDialogOpen(false) };

  interface ExecutionResult {
    errorMessage: string;
    compiledProgram: string;
    dmfConfiguration: any;
  }

  // Define TypeScript interfaces for your API error response if you know the structure.
  interface ApiErrorResponse {
    response?: {
      data?: ExecutionResult;
    }
  }

  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [CompilationStatusSnackbarOpen, setCompilationStatusSnackbarOpen] = useState<boolean>(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { loading, success, sendRequest } = useApiCall();

  // Define TypeScript interfaces for your API error response if you know the structure.

  const handleSendProgramToBackend = async () => {
    try {
      const programActions = convertBlocksToActions(blocks);
      const result = await sendRequest(
        "/api/compile",
        "POST",
        programActions,
        {
          "Content-Type": "application/json",
        }
      );

      setExecutionResult(result);
      handleDownloadFiles();
      setCompilationStatusSnackbarOpen(true);

    } catch (error) {
      setCompilationStatusSnackbarOpen(false);
      const apiError = error as ApiErrorResponse;
      const result = apiError?.response?.data;

      if(!result) {
        return;
      }

      setExecutionResult(result);
      // Handle specific error message display
      if (result.errorMessage) {
        setErrorMessage(result.errorMessage);
        setIsErrorDialogOpen(true);
      } else {
        setErrorMessage("An error occurred, but no error message was provided.");
        setIsErrorDialogOpen(true);
      }
    }
  }

  const handleDownloadFiles = () => {
    if (!executionResult) return;

    const compiledProgram = executionResult.compiledProgram;
    const dmfConfiguration = JSON.stringify(executionResult.dmfConfiguration, null, 2);

    downloadFile(compiledProgram, getCompiledProgramFileName(), "text/plain");
    downloadFile(dmfConfiguration, getDmfConfigurationFileName(), "application/json");
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
          DMF-Programmer
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
        onRun={() => handleSendProgramToBackend()}
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
      <Snackbar open={CompilationStatusSnackbarOpen} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
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
        onRun={() => handleDownloadFiles()}
        error={errorMessage}
      />
    </AppBar>
  );
};

export default Navbar;