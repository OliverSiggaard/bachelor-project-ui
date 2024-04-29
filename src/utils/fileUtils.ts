// Utility function used for initiating browser download of file with given filename
export const downloadFile = (data: any, fileName: string, mimeType: string) => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = fileName; // Set filename
  a.click();
  window.URL.revokeObjectURL(url); // Clean up
}

// Utility function to create a filename for the compiled program (.basm file)
export const getCompiledProgramFileName = () => {
  const currentTime = new Date().toLocaleTimeString('da-DK').replaceAll(".", "");
  return `compiled_program_${currentTime}.basm`;
}

// Utility function to create a filename for the dmf configuration (.json file)
export const getDmfConfigurationFileName = () => {
  const currentTime = new Date().toLocaleTimeString('da-DK').replaceAll(".", "");
  return `dmf_configuration_${currentTime}.json`;
}

// Utility function to create a filename for the program sketch (.json file)
export const getProgramSketchFileName = () => {
  const currentTime = new Date().toLocaleTimeString('da-DK').replaceAll(".", "");
  return `program_sketch_${currentTime}.json`;
}