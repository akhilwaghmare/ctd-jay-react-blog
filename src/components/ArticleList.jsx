import { useState } from "react";

const ArticleList = ({ articles }) => {
  return (
    <div className="articleList">
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
  const [isBodyHidden, setIsBodyHidden] = useState(true);

  const handleClick = () => {
    setIsBodyHidden((prev) => !prev);
  };

  return (
    <div className="article">
      {/* NOTE: NEVER do what I did here and have an onClick on an <h1> for accessibility, wrap instead in something like a button */}
      <h1 onClick={handleClick}>{article.title}</h1>
      <span>
        {article.author} | {article.publicationDate}
      </span>
      {/* <img src={article.imageUrl} /> */}
      {!isBodyHidden && <p>{article.body}</p>}
      <hr />
    </div>
  );
};

export default ArticleList;
