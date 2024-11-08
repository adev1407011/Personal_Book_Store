import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import toast, { Toaster } from 'react-hot-toast'; 
import Navbar from "./Navbar";

const DeleteBook = () => {
    const navigate = useNavigate();
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [books, setBooks] = useState([]); // State to hold fetched books
    const [selectedBook, setSelectedBook] = useState(null); // State to hold the selected book

    const fetchBooks = async () => {
        if (!bookName || !authorName) {
            toast.error("Please enter both book name and author name.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4001/book?name=${bookName}&author=${authorName}`);
            if (response.data.length > 0) {
                setBooks(response.data);
            } else {
                toast.error("No matching books found.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch books.");
        }
    };

    const handleDelete = async () => {
        if (!selectedBook) {
            toast.error("Please select a book to delete.");
            return;
        }
    
        try {
            const response = await axios.delete(`http://localhost:4001/book`, {
                data: { id: selectedBook._id } // Ensure the ID is sent here
            });
    
            if (response.status === 200) {
                toast.success("Book deleted successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete book."); // More informative error message can be added here
        }
    };
    

    const handleBookSelect = (book) => {
        setSelectedBook(book);
        setBooks([]); // Clear the list after selection
    };

    const handleRedirect = () => {
        navigate("/");
    };

    return (
        <>
        <Navbar/>

        <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-32">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Delete Book</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Please enter the book name and author name to find the book to delete.
            </p>
            <input
                type="text"
                placeholder="Book Name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
                type="text"
                placeholder="Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
                onClick={fetchBooks}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Search Books
            </button>

            {books.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Select a book to delete:</h3>
                    {books.map((b) => (
                        <div key={b._id} className="border p-2 mb-2 cursor-pointer" onClick={() => handleBookSelect(b)}>
                            <h3>{b.name} by {b.author}</h3>
                            <p>{b.category}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedBook && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Confirm Deletion:</h3>
                    <p>Are you sure you want to delete "{selectedBook.name}" by {selectedBook.author}?</p>
                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handleDelete}
                            className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Delete Book
                        </button>
                        <button
                            onClick={handleRedirect}
                            className="w-full py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <Toaster />
        </div>
        </>
    );
};

export default DeleteBook;
