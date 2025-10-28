import "./SavedNewsHeader.css";
import React from "react";

function SavedNewsHeader({ articlesCount, currentUser, keywords }) {
  const userName = currentUser?.name || "User";

  const getKeywordsSummary = () => {
    if (keywords.length === 0) return "no keywords";

    const sorted = [...keywords].sort();

    if (sorted.length === 1) return sorted[0];
    if (sorted.length === 2) return `${sorted[0]} and ${sorted[1]}`;
    if (sorted.length === 3)
      return `${sorted[0]}, ${sorted[1]}, and ${sorted[2]}`;
    return `${sorted[0]}, ${sorted[1]}, and ${sorted.length - 2} others${
      sorted.length - 2 > 1 ? "s" : ""
    }`;
  };

  return (
    <div className="saved-news-header">
      <p className="saved-news-header__title">Saved articles</p>
      <h2 className="saved-news-header__subtitle">
        {userName.slice(0, 1).toUpperCase() + userName.slice(1)}, you have
        {articlesCount} saved articles.
      </h2>
      <p className="saved-news-header__keywords">
        By keywords:
        <span className="saved-news-header__keywords-summary">
          {getKeywordsSummary()}
        </span>
      </p>
    </div>
  );
}

export default SavedNewsHeader;
