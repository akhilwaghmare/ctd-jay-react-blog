import { createContext, useContext } from "react";

const ArticleDataContext = createContext();

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const ArticleDataProvider = ({ children }) => {
  return (
    <ArticleDataContext.Provider value={{}}>
      {children}
    </ArticleDataContext.Provider>
  );
};

export const useArticleData = () => {
  return useContext(ArticleDataContext);
};
