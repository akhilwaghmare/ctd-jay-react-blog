import { useParams } from "react-router-dom";
import { useArticleData } from "../providers/article-data";
import { useEffect, useState } from "react";

const ArticlePage = () => {
  const { getArticleWithId, isLoading } = useArticleData();
  const { id } = useParams();

  const [article, setArticle] = useState();

  useEffect(() => {
    if (!isLoading) {
      setArticle(getArticleWithId(id));
    }
  }, [getArticleWithId, id, isLoading]);

  if (!article) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </div>
  );
};

export default ArticlePage;
