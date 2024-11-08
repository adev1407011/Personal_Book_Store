import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import toast, { Toaster } from 'react-hot-toast'; 
import Navbar from "./Navbar";

const AddBook = () => {
    const [book, setBook] = useState({
        name: "",
        author: "",
        category: "",
        title: "",
        image: "",
        url: "", // New field for book URL
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4001/book", book);
            console.log(response.data);
            toast.success("Book added successfully!");
            setBook({
                name: "",
                author: "",
                category: "",
                title: "",
                image: "",
                url: "", // Reset the new field
            });
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error("Error: " + error.response.data.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    const handleRedirect = () => {
        navigate("/");
    };

    return (
        <>
        <Navbar/>

        <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-24">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Book Name"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                    type="text"
                    name="url"
                    placeholder="Book URL"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Add Book
                </button>
            </form>
            <button
                onClick={handleRedirect}
                className="mt-4 w-full py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
            >
                Go to Home
            </button>
            <Toaster />
        </div>
        </>
    );
};

export default AddBook;
