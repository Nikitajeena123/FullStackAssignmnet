const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./database');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files allowed'));
  }
});

// Upload PDF
app.post('/documents/upload', upload.single('pdf'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'PDF required' });

  const date = new Date().toISOString();
  db.run(
    `INSERT INTO documents (filename, filepath, filesize, created_at) VALUES (?, ?, ?, ?)`,
    [file.originalname, file.path, file.size, date],
    function () {
      res.status(200).json({ message: 'Uploaded', id: this.lastID });
    }
  );
});

// List PDFs
app.get('/documents', (req, res) => {
  db.all(`SELECT * FROM documents`, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Download PDF
app.get('/documents/:id', (req, res) => {
  db.get(`SELECT * FROM documents WHERE id = ?`, [req.params.id], (err, doc) => {
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.download(doc.filepath);
  });
});

// Delete PDF
app.delete('/documents/:id', (req, res) => {
  db.get(`SELECT * FROM documents WHERE id = ?`, [req.params.id], (err, doc) => {
    if (!doc) return res.status(404).json({ message: 'Not found' });

    fs.unlinkSync(doc.filepath);
    db.run(`DELETE FROM documents WHERE id = ?`, [req.params.id], () => {
      res.json({ message: 'Deleted' });
    });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
