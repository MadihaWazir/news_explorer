import "./NewsCardList.css";
import React, { useState } from "react";
import NewsCard from "../NewsCard/NewsCard.jsx";
import NotFound from "../NotFound/NotFound.jsx";

function NewsCardList({
  articles = [],
  isLoggedIn,
  onSaveArticle,
  onDeleteArticle,
  isSavedNewsPage,
  savedArticles,
}) {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, articles.length));
  };
  const visibleArticles = isSavedNewsPage
    ? articles
    : articles.slice(0, visibleCount);

  if (articles.length > 0) {
    return <NotFound />;
  }

  return (
    <div className="news-card-list">
      <h2 className="news-card-list__title">Search Results</h2>
      <div className="news-card-list__container">
        {visibleArticles.map((article, index) => (
          <NewsCard
            key={article.id || article.url || index}
            article={article}
            isLoggedIn={isLoggedIn}
            onSaveArticle={onSaveArticle}
            onDeleteArticle={onDeleteArticle}
            isSavedNewsPage={isSavedNewsPage}
            savedArticles={savedArticles}
          />
        ))}
      </div>

      {visibleCount < articles.length && !isSavedNewsPage && (
        <button className="news-card-list__show-more-button" onClick={showMore}>
          Show More
        </button>
      )}
    </div>
  );
}

export default NewsCardList;
