import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Bookcollection() {
  const [book, setBook] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [readLaterBooks, setReadLaterBooks] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book"); // API endpoint
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();

    // Fetch recently viewed books
    const storedRecentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(storedRecentlyViewed);

    // Fetch saved "read later" books from localStorage
    const storedReadLater = JSON.parse(localStorage.getItem("readLaterBooks")) || [];
    setReadLaterBooks(storedReadLater);
  }, []);

  // Toggle "Save for Later" functionality
  const toggleLike = (book) => {
    let updatedReadLaterBooks = [...readLaterBooks];
    const index = updatedReadLaterBooks.findIndex((item) => item._id === book._id);
    if (index > -1) {
      // If book is already in read later, remove it
      updatedReadLaterBooks.splice(index, 1);
    } else {
      // Otherwise, add the book to read later
      updatedReadLaterBooks = [book, ...updatedReadLaterBooks];
    }
    setReadLaterBooks(updatedReadLaterBooks);
    localStorage.setItem("readLaterBooks", JSON.stringify(updatedReadLaterBooks));
  };

  // Filter books based on the search query
  const filteredBooks = book.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter books based on selected category
  const categoryBooks = selectedCategory
    ? book
        .filter((item) => item.category === selectedCategory) // Filter books by selected category
        .sort((a, b) => b.views - a.views) // Sort books by views in descending order
        .slice(0, 4) // Get only the top 4 books based on views
    : [];

  // Handle Book Click to set the selected book's category and show related books
  const handleBookClick = (book) => {
    // Add book to recently viewed
    let updatedRecentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    updatedRecentlyViewed = updatedRecentlyViewed.filter((b) => b._id !== book._id); // Avoid duplicates
    updatedRecentlyViewed = [book, ...updatedRecentlyViewed].slice(0, 4); // Keep only the latest 4 books

    setRecentlyViewed(updatedRecentlyViewed); // Update the state
    localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecentlyViewed)); // Save to localStorage

    // Set the selected category based on the clicked book
    setSelectedCategory(book.category); // Set the selected category for related book display
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl text-violet-400">
            Book{" "}
            <span className="text-purple-500">Are A</span> Uniquely{" "}
            <span className="text-purple-500">Portable</span> Magic...
          </h1>
        </div>

        <div className="flex justify-center mt-9 ">
          <img
            src="book6.webp"
            alt="book"
            style={{ height: "555px", width: "444px" }}
          />
        </div>

        {/* Search Input */}
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search by name or category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-6 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Recently Viewed Books */}
        {recentlyViewed.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl md:text-3xl text-violet-400 text-center mb-4">Recently Viewed Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {recentlyViewed.map((item) => (
                <div key={item._id} onClick={() => handleBookClick(item)}>
                  <Cards item={item} onLikeToggle={toggleLike} isLiked={false} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Books Based on Selected Category */}
        {categoryBooks.length > 0 && selectedCategory && (
          <div className="mt-6">
            <h2 className="text-xl md:text-3xl text-violet-400 text-center mb-4">
              Since You Searched For {selectedCategory}...
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {categoryBooks.map((item) => (
                <div key={item._id} onClick={() => handleBookClick(item)}>
                  <Cards item={item} onLikeToggle={toggleLike} isLiked={readLaterBooks.some((book) => book._id === item._id)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Saved Books ("Read Later") */}
        {readLaterBooks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl md:text-3xl text-violet-400 text-center mb-4">Your Saved Books</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {readLaterBooks.map((item) => (
                <div key={item._id}>
                  <Cards item={item} onLikeToggle={toggleLike} isLiked={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Filtered Books */}
        <div className="mt-8">
          <h2 className="text-xl md:text-3xl text-violet-400 text-center mb-4">Book Collection</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredBooks.map((item) => (
              <div key={item._id} onClick={() => handleBookClick(item)}>
                <Cards item={item} onLikeToggle={toggleLike} isLiked={readLaterBooks.some((book) => book._id === item._id)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookcollection;
