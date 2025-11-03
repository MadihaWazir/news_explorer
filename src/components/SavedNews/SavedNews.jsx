import React from "react";
import "./SavedNews.css";

function SavedNews({ savedArticles, onDeleteArticle }) {
  const keywords = savedArticles.map((article) => article.keyword);
  const uniqueKeywords = [...new Set(keywords)];
  const currentUser = { name: "User" }; // Placeholder for current user data
  // Placeholder for SavedNewsHeader and NewsCardList components
  return (
    <section className="saved-news">
      <SavedNewsHeader
        savedArticles={savedArticles.length}
        currentUser={currentUser}
        keywords={uniqueKeywords}
      />
      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={true}
          onDeleteArticle={onDeleteArticle}
          isSavedNewsPage={true}
          savedArticles={savedArticles}
        />
      ) : (
        <div className="saved-news__no-articles">
          <h2 className="saved-news__no-articles-title">
            You have no saved articles
          </h2>
        </div>
      )}
    </section>
  );
}

export default SavedNews;
