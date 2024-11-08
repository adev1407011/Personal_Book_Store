import React from "react";
import { useAuth } from "./Context/Authuprovider";
import { Link } from "react-router-dom";
import AddBook from "./Components/AddBook";

const AdminPanel = () => {
    const [authUser] = useAuth();

    return (
        <div className="max-w-screen-lg mx-auto p-6 mt-10">
            {authUser ? (
                <>
                    <h3 className="text-xl font-semibold mt-6">Manage Books</h3>
                    <div className="flex space-x-4 mt-4">
                        <Link to="/edit">
                            <button className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Edit Book
                            </button>
                        </Link>
                        <Link to="/delete">
                            <button className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">
                                Delete Book
                            </button>
                        </Link>
                    </div>
                    <AddBook />
                </>
            ) : (
                <p>Please log in to add books.</p>
            )}
        </div>
    );
};

export default AdminPanel;
