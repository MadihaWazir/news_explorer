import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import About from "../About/About";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";

import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";

import {
  getUser,
  setUser,
  getRegisteredUsers,
  setRegisteredUsers,
  getSavedArticles,
  saveArticles,
} from "../../utils/localStorage";

import { searchNews } from "../../Api/newsApi";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(getUser());

  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState(getSavedArticles());
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    saveArticles(savedArticles);
  }, [savedArticles]);

  function handleLogin(data) {
    const storedUsers = getRegisteredUsers();
    const userData = storedUsers[data.email];

    if (!userData) {
      alert("No user found. Please register first.");
      return;
    }

    const loggedInUser = {
      name: userData.name,
      email: userData.email,
    };

    setCurrentUser(loggedInUser);
    setUser(loggedInUser);
    setIsLoginOpen(false);
  }

  function handleRegister(data) {
    const storedUsers = getRegisteredUsers();

    if (storedUsers[data.email]) {
      alert("User already exists. Please log in.");
      return;
    }

    storedUsers[data.email] = { name: data.name, email: data.email };
    setRegisteredUsers(storedUsers);

    const newUser = { name: data.name, email: data.email };
    setCurrentUser(newUser);
    setUser(newUser);

    setIsRegisterOpen(false);
    setIsSuccessOpen(true);
  }

  function handleLogout() {
    setCurrentUser(null);
    setUser(null);

    setHasSearched(false);
    setArticles([]);
    setSearchQuery("");
  }

  function handleSaveArticle(article, isSaved) {
    console.log("handleSaveArticle called with:", { article, isSaved });

    if (!currentUser) {
      setIsLoginOpen(true);
      return;
    }

    if (isSaved) {
      const articleWithKeyword = {
        ...article,
        keyword: searchQuery || "General",
      };

      const updated = [...getSavedArticles(), articleWithKeyword];
      setSavedArticles(updated);
      saveArticles(updated);
      console.log("Updated saved article:", updated);
    } else {
      // Optionally handle unsaving an article
      console.log("Article is not saved yet.");
      const updated = getSavedArticles.filter((a) => a.title !== article.title);
      setSavedArticles(updated);
      saveArticles(updated);
    }
  }

  async function handleSearch(query) {
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(query);

    await new Promise((resolve) => setTimeout(resolve, 10000));

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
    <BrowserRouter basename="/news_explorer/">
      <Header
        isloggedIn={!!currentUser}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSignInClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsRegisterOpen(true)}
        isAnyModalOpen={isLoginOpen || isRegisterOpen || isSuccessOpen}
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
                      isSavedNewsPage={false}
                      savedArticles={savedArticles}
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
                const update = savedArticles.filter(
                  (a) => a.title !== article.title
                );
                saveArticles(update);
                setSavedArticles(update);
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

      <RegistrationSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onSwitchToLogin={() => {
          setIsSuccessOpen(false);
          setIsLoginOpen(true);
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
