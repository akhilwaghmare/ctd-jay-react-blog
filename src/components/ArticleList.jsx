import styles from "./ArticleList.module.css";
import { useArticleData } from "../providers/article-data";
import { useNavigate } from "react-router-dom";

const ArticleList = () => {
  const { articles, isLoading } = useArticleData();

  if (isLoading) {
    return (
      <div className={styles.articleList}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={styles.articleList}>
      {articles.length === 0 ? (
        <h1>No articles</h1>
      ) : (
        <>
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </>
      )}
    </div>
  );
};

const ArticleCard = ({ article }) => {
  const router = useNavigate();

  const handleClick = () => {
    router(`/article/${article.id}`);
  };

  return (
    <div className={styles.article}>
      {/* NOTE: NEVER do what I did here and have an onClick on an <h1> for accessibility, wrap instead in something like a button */}
      <h1 onClick={handleClick}>{article.title}</h1>
      <span>
        {article.author} | {article.publicationDate}
      </span>
      <hr />
    </div>
  );
};

export default ArticleList;
