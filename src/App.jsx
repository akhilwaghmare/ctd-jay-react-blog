import "./App.css";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { dummyArticles, dummyArticles2 } from "./data";

import { useState } from "react";

function App() {
  const [articles, setArticles] = useState(dummyArticles);

  const handleButton = () => {
    if (articles === dummyArticles) {
      setArticles(dummyArticles2);
    } else {
      setArticles(dummyArticles);
    }
  };

  return (
    <>
      <Header />
      <button onClick={handleButton}>Switch articles</button>
      <ArticleList articles={articles} />
      <Footer />
    </>
  );
}

export default App;

// TODO
// Header / navigation
// Contact form
// Could add videos as well
