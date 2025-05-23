import "./App.css";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { useArticleData } from "./providers/article-data";

function App() {
  const { articles, searchValue, sortOrder, dispatch } = useArticleData();

  const handleSortChange = (event) => {
    dispatch({ type: "updateSortOrder", payload: event.target.value });

    const sortedArticles = articles.toSorted((a, b) => {
      if (sortOrder === "asc") {
        return b.publicationDate.localeCompare(a.publicationDate);
      } else {
        return a.publicationDate.localeCompare(b.publicationDate);
      }
    });

    dispatch({ type: "updateArticles", payload: sortedArticles });
  };

  return (
    <>
      <Header />
      <form style={{ display: "flex", gap: "16px" }}>
        <div>
          <label htmlFor="searchInput">Search: </label>
          <input
            id="searchInput"
            value={searchValue}
            onChange={(e) =>
              dispatch({ type: "updateSearchValue", payload: e.target.value })
            }
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
      <ArticleList />
      <Footer />
    </>
  );
}

export default App;
