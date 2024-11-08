import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import toast, { Toaster } from 'react-hot-toast'; 
import Navbar from "./Navbar";

const EditBook = () => {
    const [book, setBook] = useState({
        _id: "",
        name: "",
        author: "",
        category: "",
        title: "",
        image: "",
        url: "", // Add book URL to the state
    });
    const [search, setSearch] = useState({ name: "", author: "" });
    const [books, setBooks] = useState([]); // State to hold multiple books
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };

    const fetchBook = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/book?name=${search.name}&author=${search.author}`);
            if (response.data.length > 0) {
                setBooks(response.data); // Store all matching books
            } else {
                toast.error("Book not found.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch book details.");
        }
    };

    const handleBookSelect = (selectedBook) => {
        setBook(selectedBook); // Set the selected book for editing
        setBooks([]); // Clear the book list after selection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4001/book`, { 
                ...book, 
                id: book._id, // Include the book ID for updating
            });
            toast.success("Book updated successfully!");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update book.");
        }
    };

    return (
        <>
        <Navbar/>

        <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-32">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit Book</h2>
            <input
                type="text"
                name="name"
                placeholder="Book Name"
                onChange={handleSearchChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
            />
            <input
                type="text"
                name="author"
                placeholder="Author"
                onChange={handleSearchChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            <button
                onClick={fetchBook}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2"
            >
                Search Book
            </button>

            {books.length > 0 && (
                <div className="mt-4">
                    {books.map((b) => (
                        <div key={b._id} className="border p-2 mb-2 cursor-pointer" onClick={() => handleBookSelect(b)}>
                            <h3>{b.name} by {b.author}</h3>
                            <p>{b.category}</p>
                        </div>
                    ))}
                </div>
            )}

            {book.name && (
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={book.category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={book.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={book.image}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="url"
                        placeholder="Book URL" // New field for book URL
                        value={book.url}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Update Book
                    </button>
                </form>
            )}
            <Toaster />
        </div>
        </>
    );
};

export default EditBook;
