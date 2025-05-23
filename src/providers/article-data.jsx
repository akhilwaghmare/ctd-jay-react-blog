import { createContext, useContext, useEffect, useReducer } from "react";

const ArticleDataContext = createContext();

const initialState = {
  allArticles: [],
  articles: [],
  searchValue: "",
  sortOrder: "asc",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "initialLoad":
      return {
        ...state,
        allArticles: action.payload,
      };
    case "updateArticles":
      return {
        ...state,
        articles: action.payload,
      };
    case "updateSortOrder":
      return {
        ...state,
        sortOrder: action.payload,
      };
    case "updateSearchValue":
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};

export const ArticleDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const filteredArticles = state.allArticles.filter((a) =>
      a.title.toLowerCase().includes(state.searchValue.toLowerCase())
    );

    dispatch({ type: "updateArticles", payload: filteredArticles });
  }, [state.searchValue, state.allArticles]);

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
      dispatch({ type: "initialLoad", payload: articleData });
    } catch (error) {
      console.log("Error occured: ", error.message);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticleDataContext.Provider
      value={{
        articles: state.articles,
        searchValue: state.searchValue,
        sortOrder: state.sortOrder,
        dispatch,
      }}
    >
      {children}
    </ArticleDataContext.Provider>
  );
};

export const useArticleData = () => {
  return useContext(ArticleDataContext);
};
