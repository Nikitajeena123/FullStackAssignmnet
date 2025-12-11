import express from "express";
import upload from "../middleware/upload.js";

import {
  uploadDocument,
  listDocuments,
  downloadDocument,
  deleteDocumentController,
} from "../controllers/documentController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", listDocuments);
router.get("/:id", downloadDocument);
router.delete("/:id", deleteDocumentController);

export default router;
