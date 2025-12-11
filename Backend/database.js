const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./documents.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    filepath TEXT,
    filesize INTEGER,
    created_at TEXT
  )`);
});

module.exports = db;
