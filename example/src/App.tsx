import React, { useState, useEffect } from "react";
import DropzoneArea from "./reactComponentLib";
import { Typography } from "@material-ui/core";

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div style={{ textAlign:'center' }}>
      <Typography variant="h5">react-dropzone-material-ui</Typography>
      <DropzoneArea
        onChange={setFiles}
        filesLimit={2}
        dropzoneText="Drag 'n' drop some files here, or click to select files"
        acceptedFiles={["image/*", "application/*", "video/*"]}
        errorMessages={{
          acceptedFiles: "File type is not supported.",
          filesLimit: "Maximun number of files are exceeded.",
          maxFileSize: "File size is too big."
        }}
      />
    </div>
  );
};

export default App;
