import React from "react";
import UploadForm from "./components/UploadForm";
import FileList from "./components/FileList";

const App = () => {
  return (
    <div style={{ width: "50%", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Patient Document Portal</h1>
      <UploadForm />
      <FileList />
    </div>
  );
};

export default App;
