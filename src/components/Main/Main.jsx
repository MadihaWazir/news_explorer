import "./Main.css";
import React, { useState } from "react";
import mainPic from "../../images/main-pic-min.jpg";

function Main({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    onSearch(searchInput);
  };

  return (
    <section className="main">
      <div
        className="main__hook"
        style={{ backgroundImage: `url(${mainPic})` }}
      >
        <div className="main__content">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          <form className="main__search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="main__search-input"
              placeholder="Enter topic"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="main__search-button">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Main;
