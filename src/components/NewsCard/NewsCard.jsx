import "./NewsCard.css";
import React, { useState, useEffect } from "react";

function NewsCard({
  article,
  isLoggedIn,
  onSaveArticle,
  onDeleteArticle,
  isSavedNewsPage,
  savedArticles,
}) {
  const [isSaved, setIsSaved] = useState(
    savedArticles?.some(
      (savedArticle) => savedArticle.title === article.title
    ) || false
  );
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsSaved(
      savedArticles?.some(
        (savedArticle) => savedArticle.title === article.title
      ) || false
    );
  }, [savedArticles, article.title]);

  const formattedData = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const btnclassName = isSavedNewsPage
    ? "news-card__delete-button"
    : `news-card__save-button ${isSaved ? "news-card__save-button_saved" : ""}`;

  function handleSaveClick() {
    e.preventDefault();
    e.stopPropagation();
    if (isSavedNewsPage) {
      if (onDeleteArticle) onDeleteArticle(article);
    } else {
      if (!isLoggedIn) return;
      setIsSaved((s) => !s);
      if (onSaveArticle) onSaveArticle(article, !isSaved);
    }
  }

  return (
    <article className="news-card">
      <div className="news-card__media">
        {article.urlToImage && !imageError ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news-card__image"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="news-card__placeholder">No image available</div>
        )}

        {isSavedNewsPage && article.keyword && (
          <div className="news-card__keyword">
            {article.keyword.charAt(0).toUpperCase() + article.keyword.slice(1)}
          </div>
        )}

        <button
          type="button"
          className={btnclassName}
          onClick={handleSaveClick}
          aria-label={
            isSavedNewsPage
              ? "Delete article"
              : isSaved
              ? "Unsave article"
              : "Save article"
          }
          aria-pressed={isSaved}
        >
          {!isLoggedIn && !isSavedNewsPage && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
          {isSavedNewsPage && (
            <span className="news-card__tooltip">Remove from saved</span>
          )}
        </button>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{formattedData}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
