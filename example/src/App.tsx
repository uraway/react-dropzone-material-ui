import React, { useState, useEffect } from "react";
import "./App.css";
import DropzoneArea from "./reactComponentLib";

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="App">
      <DropzoneArea
        onChange={setFiles}
        filesLimit={2}
        dropzoneText="Drag 'n' drop some files here, or click to select files"
        acceptedFiles={["image/png"]}
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
