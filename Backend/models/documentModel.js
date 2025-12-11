import db from "../config/db.js";

export const insertDocument = (data, callback) => {
  const query = `
    INSERT INTO documents (filename, filepath, filesize, created_at)
    VALUES (?, ?, ?, ?)
  `;
  db.run(
    query,
    [data.filename, data.filepath, data.filesize, data.created_at],
    callback
  );
};

export const getAllDocuments = (callback) => {
  db.all("SELECT * FROM documents ORDER BY id DESC", callback);
};

export const getDocumentById = (id, callback) => {
  db.get("SELECT * FROM documents WHERE id = ?", [id], callback);
};

export const deleteDocument = (id, callback) => {
  db.run("DELETE FROM documents WHERE id = ?", [id], callback);
};
