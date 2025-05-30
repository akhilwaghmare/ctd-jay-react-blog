import { createContext, useContext, useEffect, useReducer } from "react";
import { getArticles } from "../db/query";

const ArticleDataContext = createContext();

const initialState = {
  allArticles: [],
  articles: [],
  searchValue: "",
  sortOrder: "desc",
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loadAllArticles":
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
    case "updateLoading":
      return {
        ...state,
        isLoading: action.payload,
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

    const sortedArticles = filteredArticles.toSorted((a, b) => {
      if (state.sortOrder === "desc") {
        return b.publicationDate.localeCompare(a.publicationDate);
      } else {
        return a.publicationDate.localeCompare(b.publicationDate);
      }
    });

    dispatch({ type: "updateArticles", payload: sortedArticles });
  }, [state.searchValue, state.allArticles, state.sortOrder]);

  const fetchArticles = async () => {
    dispatch({ type: "updateLoading", payload: true });
    try {
      const articleData = await getArticles();
      dispatch({ type: "loadAllArticles", payload: articleData });
    } catch (error) {
      console.log("Error occured: ", error.message);
    } finally {
      dispatch({ type: "updateLoading", payload: false });
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
        isLoading: state.isLoading,
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
