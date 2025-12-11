import React, { useEffect, useState } from "react";
import API from "../api/api";
import FileItem from "./FileItem";

const FileList = () => {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const response = await API.get("/");
    setFiles(response.data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {files.map((file) => (
          <FileItem key={file.id} file={file} />
        ))}
      </ul>
    </div>
  );
};

export default FileList;
