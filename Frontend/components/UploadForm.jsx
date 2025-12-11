import React, { useState } from "react";
import API from "../api/api";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please choose a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/upload", formData);
      setMessage("File uploaded successfully!");
      window.location.reload(); // Refresh list
    } catch (err) {
      setMessage("Upload failed. Only PDF allowed.");
    }
  };

  return (
    <div>
      <form onSubmit={uploadFile}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
