// Utility function used for initiating browser download of file with given filename
export const downloadFile = (data: any, fileName: string) => {
  const blob = new Blob([data], { type: 'text-plain' });
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