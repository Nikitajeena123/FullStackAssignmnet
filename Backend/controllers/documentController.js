import fs from "fs";
import path from "path";
import {
  insertDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
} from "../model/documentModel.js";

export const uploadDocument = (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Please upload a PDF file" });

  const fileData = {
    filename: req.file.originalname,
    filepath: req.file.filename,
    filesize: req.file.size,
    created_at: new Date().toISOString(),
  };

  insertDocument(fileData, function (err) {
    if (err) return res.status(500).json({ error: "Database error" });

    res.json({ message: "File uploaded successfully" });
  });
};

export const listDocuments = (req, res) => {
  getAllDocuments((err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
};

export const downloadDocument = (req, res) => {
  const id = req.params.id;

  getDocumentById(id, (err, doc) => {
    if (err || !doc)
      return res.status(404).json({ error: "File not found" });

    const filePath = path.join("uploads", doc.filepath);
    res.download(filePath, doc.filename);
  });
};

export const deleteDocumentController = (req, res) => {
  const id = req.params.id;

  getDocumentById(id, (err, doc) => {
    if (err || !doc)
      return res.status(404).json({ error: "File not found" });

    // Remove file from uploads
    const filePath = path.join("uploads", doc.filepath);
    fs.unlink(filePath, () => {});

    // Remove from DB
    deleteDocument(id, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });

      res.json({ message: "File deleted successfully" });
    });
  });
};
