import Book from "../Model/Book.Model.js";

export const getBook = async (req, res) => {
    try {
        const { name, author } = req.query; // Get name and author from query params
        let query = {};

        if (name) query.name = name;
        if (author) query.author = author;

        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Add a new book
export const addBook = async (req, res) => {
    try {
        const { name, author, category, title, image, url } = req.body;
        const newBook = new Book({ name, author, category, title, image, url });
        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    console.log("Update request body:", req.body); // Logging request body
    const { id, ...updateData } = req.body; // Expecting ID in the body
    try {
        const result = await Book.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            return res.status(404).json({ message: "Book not found." });
        }
        res.status(200).json({ message: "Book updated successfully", book: result });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    const { id } = req.body; // Get the ID from the request body
    try {
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Book not found." });
        }
        res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
