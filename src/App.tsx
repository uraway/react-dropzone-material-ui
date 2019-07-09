import React, { useState, useEffect } from "react";
import "./App.css";
import DropzoneArea from "./DropzoneArea";

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="App">
      <DropzoneArea onChange={setFiles} multiple={true} />
    </div>
  );
};

export default App;
