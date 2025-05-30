import ArticleList from "../components/ArticleList";
import { useArticleData } from "../providers/article-data";

const HomePage = () => {
  const { searchValue, sortOrder, dispatch } = useArticleData();

  const handleSortChange = (event) => {
    dispatch({ type: "updateSortOrder", payload: event.target.value });
  };

  return (
    <>
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
    </>
  );
};

export default HomePage;
