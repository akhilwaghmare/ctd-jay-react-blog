import "./App.css";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { useState, useEffect } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const [allArticles, setAllArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
          import.meta.env.VITE_TABLE_NAME
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error fetching articles");
      }
      const data = await res.json();
      const articleData = data.records.map((r) => r.fields);
      console.log(articleData);
      setAllArticles(articleData);
    } catch (error) {
      console.log("Error occured: ", error.message);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);

    const sortedArticles = articles.toSorted((a, b) => {
      if (sortOrder === "asc") {
        return b.publicationDate.localeCompare(a.publicationDate);
      } else {
        return a.publicationDate.localeCompare(b.publicationDate);
      }
    });

    setArticles(sortedArticles);
  };

  useEffect(() => {
    const filteredArticles = allArticles.filter((a) =>
      a.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setArticles(filteredArticles);
  }, [searchValue, allArticles]);

  return (
    <>
      <Header />
      <form style={{ display: "flex", gap: "16px" }}>
        <div>
          <label htmlFor="searchInput">Search: </label>
          <input
            id="searchInput"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sortOrder">Date Order: </label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </form>
      <ArticleList articles={articles} />
      <Footer />
    </>
  );
}

export default App;
