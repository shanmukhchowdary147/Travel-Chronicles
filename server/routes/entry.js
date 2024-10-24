import express from "express";
import {
  createEntry,
  deleteEntry,
  getEntries,
  updateEntry,
  getEntry,
  getPublicEntries,
} from "../controllers/entry.js";

const router = express.Router();

router.post("/create", createEntry);
//
router.get("/view/:id", getEntry);
router.put("/entry/:id", updateEntry);
router.delete("/entry/:id", deleteEntry);
//
router.get("/all/author", getEntries);
router.get("/all/public", getPublicEntries);

export default router;
