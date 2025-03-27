import { useState } from "react";

const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard article={article} />
      ))}
    </div>
  );
};

const ArticleCard = ({ article }) => {
  const [isBodyHidden, setIsBodyHidden] = useState(false);

  return (
    <div className="article">
      {/* NOTE: NEVER do what I did here and have an onClick on an <h1> for accessibility, wrap instead in something like a button */}
      <h1 onClick={() => setIsBodyHidden((prev) => !prev)}>{article.title}</h1>
      <span>
        {article.author} | {article.publicationDate}
      </span>
      {/* <img src={article.imageUrl} /> */}
      {!isBodyHidden && <p>{article.body}</p>}
      {/* {isBodyHidden ? <p>Hidden</p> : <p>{article.body}</p>} */}
      <hr />
    </div>
  );
};

export default ArticleList;
