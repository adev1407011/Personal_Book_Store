import React, { useState, useEffect } from "react";

function Cards({ item, onLikeToggle, isLiked }) {
  const [views, setViews] = useState(() => {
    // Get the stored views from localStorage, or initialize to 0
    const storedViews = localStorage.getItem(`views-${item._id}`);
    return storedViews ? parseInt(storedViews, 10) : 0;
  });

  // Update localStorage whenever views change
  useEffect(() => {
    localStorage.setItem(`views-${item._id}`, views);
  }, [views, item._id]);

  const handleGetStartedClick = () => {
    // Increment the views
    setViews(views + 1);
    window.open(item.url, "_blank");
  };

  const handleLikeClick = () => {
    // Call the onLikeToggle function passed from parent to toggle like/unlike
    onLikeToggle(item);
  };

  return (
    <div className="mt-4 p-3 my-3">
      <div className="card bg-base-100 w-92 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="h-80 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            style={{ height: "270px", width: "300px" }}
          />
        </figure>
        <div className="card-body h-40 overflow-y-auto scrollbar-thin dark:bg-slate-900">
          <h2 className="card-title">
            {item.name}
            <div className="text-sm md:text-lg bg-primary-content rounded-full px-2 py-1 w-max">
              {item.category}
            </div>
          </h2>
          <h1 className="text-2xl md:text-2xl text-base-400">{item.author}</h1>
          <p>{item.title}</p>
          <p className="text-sm text-gray-500">Views: {views}</p>
          <div className="card-actions justify-between mt-4">
            <div
              className="badge badge-outline cursor-pointer p-3 rounded-lg border-[2px] hover:bg-error hover:text-white duration-200"
              onClick={handleGetStartedClick}
            >
              Get started
            </div>
            {/* Like button to toggle Save to Read Later */}
            <div
              className={`badge badge-outline cursor-pointer p-3 rounded-lg border-[2px] hover:bg-success hover:text-white duration-200 ${
                isLiked ? "bg-success text-white" : ""
              }`}
              onClick={handleLikeClick}
            >
              {isLiked ? "Liked" : "Save for Later"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
