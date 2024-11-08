import express from "express";
import { addBook, getBook, updateBook, deleteBook } from "../Controller/Book.Controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/", addBook);
router.put("/", updateBook); // Update the book
router.delete("/", deleteBook); // Adjusted route for deleting a book

export default router;
