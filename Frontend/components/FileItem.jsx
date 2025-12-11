import React from "react";
import API from "../api/api";

const FileItem = ({ file }) => {
  const downloadFile = () => {
    window.open(`http://localhost:5000/documents/${file.id}`);
  };

  const deleteFile = async () => {
    await API.delete(`/${file.id}`);
    window.location.reload();
  };

  return (
    <li
      style={{
        margin: "10px 0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <strong>{file.filename}</strong> <br />
      <small>Uploaded: {file.created_at}</small>
      <br />
      <button onClick={downloadFile}>Download</button>
      <button onClick={deleteFile} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </li>
  );
};

export default FileItem;
