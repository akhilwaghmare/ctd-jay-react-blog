import "./App.css";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { dummyArticles as fullArticleData } from "./data";

import { useState, useEffect } from "react";

function App() {
  const [articles, setArticles] = useState(fullArticleData);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(searchValue);

    const filteredArticles = fullArticleData.filter((a) =>
      a.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setArticles(filteredArticles);
  }, [searchValue]);

  return (
    <>
      <Header />
      <form>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <ArticleList articles={articles} />
      <Footer />
    </>
  );
}

export default App;
