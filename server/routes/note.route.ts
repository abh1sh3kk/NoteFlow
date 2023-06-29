import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import NoteController from "../controllers/note.controller";
import { authenticateUser } from "./../middlewares/auth";
config();
const router = express.Router();

router.use(cookieParser());

router.post("/", authenticateUser, NoteController.insertNote);

router.delete("/:noteId", authenticateUser, NoteController.removeNote);

router.put("/", authenticateUser, NoteController.editNote);

router.get("/", authenticateUser, NoteController.getNotes);

router.get("/health", NoteController.healthCheck);

router.get("/populate", authenticateUser, NoteController.populateWithNotes);

export default router;
