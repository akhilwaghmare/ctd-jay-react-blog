import "./App.css";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { dummyArticles as fullArticleData } from "./data";

import { useState, useRef } from "react";

function App() {
  const [articles, setArticles] = useState(fullArticleData);

  // Search Approach #1 - using useRef to track the value in the input box
  // const inputRef = useRef();

  // Search Approach #2 - controlled components for the search box
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    // const searchValue = inputRef.current.value;
    console.log(searchValue);

    const filteredArticles = fullArticleData.filter((a) =>
      a.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setArticles(filteredArticles);
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSearch}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" disabled={searchValue === ""}>
          Search
        </button>
      </form>
      {/* Add empty state for the list */}
      <ArticleList articles={articles} />
      <Footer />
    </>
  );
}

export default App;
