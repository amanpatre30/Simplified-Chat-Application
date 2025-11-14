import React, { useState } from "react";

const AnswerFeedback = ({ onFeedback }) => {
  const [selected, setSelected] = useState(null); 

  const handleClick = (type) => {
    setSelected(type);
    if (onFeedback) onFeedback(type);
  };

  return (
    <div className="flex gap-2 mt-1">
      <button
        className={`px-2 py-1 rounded border ${
          selected === "like"
            ? "bg-green-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
        }`}
        onClick={() => handleClick("like")}
      >
        👍
      </button>
      <button
        className={`px-2 py-1 rounded border ${
          selected === "dislike"
            ? "bg-red-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
        }`}
        onClick={() => handleClick("dislike")}
      >
        👎
      </button>
    </div>
  );
};

export default AnswerFeedback;
