import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";

import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";

import {
  getUser,
  setUser,
  getSavedArticles,
  saveArticles,
} from "../../utils/localStorage";

import { searchNews } from "../../Api/newsApi";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState(getSavedArticles());
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  function handleLogin(data) {
    setCurrentUser({ name: data.name || "User" });
    setIsLoginOpen(false);
  }

  function handleRegister(data) {
    setCurrentUser({ name: data.name || "User" });
    setIsRegisterOpen(false);
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  function handleSaveArticle(article, isSaved) {
    console.log("handleSaveArticle called with:", { article, isSaved });

    if (isSaved) {
      console.log("Article is already saved.");

      const articleWithKeyword = {
        ...article,
        keyword: searchTerm || "General",
      };

      const updated = [...getSavedArticles(), articleWithKeyword];
      setSavedArticles(updated);
      console.log("Updated saved article:", updated);
    } else {
      // Optionally handle unsaving an article
      console.log("Article is not saved yet.");
      const updated = getSavedArticles().filter(
        (a) => a.title !== article.title
      );
      setSavedArticles(updated);
    }
  }

  async function handleSearch(query) {
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(query);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const fetchedArticles = await searchNews(query);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BrowserRouter>
      <Header
        isloggedIn={!!currentUser}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSignInClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsRegisterOpen(true)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main onSearch={handleSearch} isLoggedIn={!!currentUser} />
              {hasSearched && (
                <section className="results-section">
                  {isLoading ? (
                    <div className="results-section__loading">
                      <Preloader />
                      <p className="results-section__text">
                        Searching for news...
                      </p>
                    </div>
                  ) : (
                    <NewsCardList
                      articles={articles}
                      isLoggedIn={!!currentUser}
                      onSaveArticle={handleSaveArticle}
                    />
                  )}
                </section>
              )}
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              currentUser={currentUser}
              savedArticles={savedArticles}
              onDeleteArticle={(article) => {
                setSavedArticles(
                  savedArticles.filter((a) => a.title !== article.title)
                );
              }}
            />
          }
        />
      </Routes>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegister}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </BrowserRouter>
  );
}

export default App;
