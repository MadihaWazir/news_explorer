import React from "react";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Footer from "../Footer/Footer.jsx";
import "./SavedNews.css";

function SavedNews({ currentUser, savedArticles, onDeleteArticle }) {
  const keywords = savedArticles
    .map((article) => article.keyword || "General")
    .filter(Boolean);
  const uniqueKeywords = [...new Set(keywords)];

  return (
    <section className="saved-news">
      <div className="saved-news__sidebar-text">Saved Articles</div>
      <SavedNewsHeader
        savedArticles={savedArticles.length}
        currentUser={currentUser}
        keywords={uniqueKeywords}
      />
      {savedArticles.length > 0 ? (
        <NewsCardList
          articles={savedArticles}
          isLoggedIn={true}
          onSaveArticle={() => {}}
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
      <Footer />
    </section>
  );
}

export default SavedNews;
