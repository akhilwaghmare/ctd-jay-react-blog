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

  const addArticle = async () => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const todaysDate = formatter.format(new Date());

    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
          import.meta.env.VITE_TABLE_NAME
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Test",
            publicationDate: todaysDate,
            body: "Test body",
            imageUrl: null,
            author: "New User",
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Error adding new article");
      }
      const data = await res.json();
      console.log("New post:", data);
    } catch (error) {
      console.log("Error occured: ", error.message);
    }
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
