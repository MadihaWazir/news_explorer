import "./NewsCard.css";
import React, { useState, useEffect } from "react";

function NewsCard({
  article,
  isLoggedIn,
  onSave,
  onDelete,
  isSavedNewsPage = false,
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

  function handleSaveClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isSavedNewsPage) {
      if (onDelete) onDelete(article);
    } else {
      if (!isLoggedIn) return;
      setIsSaved((s) => !s);
      if (onSave) onSave(article, !isSaved);
    }
  }

  return (
    <article className="news-card">
      <div className="news-card__media">
        {article.urlToImage && !imageError ? (
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="news-card__image"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          </a>
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
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="news-card__title-link"
        >
          <h3 className="news-card__title">{article.title}</h3>
        </a>
        <p className="news-card__description">{article.description}</p>
        <p className="news-card__source">{article.source?.name}</p>
      </div>
    </article>
  );
}

export default NewsCard;
