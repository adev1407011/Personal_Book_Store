import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Make name a required field
        trim: true // Remove extra whitespace
    },
    author: {
        type: String,
        required: true, // Make author a required field
        trim: true // Remove extra whitespace
    },
    category: {
        type: String,
        required: true, // Make category a required field
        trim: true // Remove extra whitespace
    },
    title: {
        type: String,
        required: true, // Make title a required field
        trim: true // Remove extra whitespace
    },
    image: {
        type: String,
        required: true, // Make image URL a required field
        trim: true // Remove extra whitespace
    },
    url: {
        type: String,
        required: true, // Make image URL a required field
        trim: true // Remove extra whitespace
    }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const Book = mongoose.model("Book", bookSchema);

export default Book;
