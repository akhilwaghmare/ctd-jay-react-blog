import { articles } from "../data";

const ArticleList = () => {
  return (
    <div>
      {articles.map((article) => (
        <div className="article">
          <h1>{article.title}</h1>
          <span>
            {article.author} | {article.publicationDate}
          </span>
          {/* <img src={article.imageUrl} /> */}
          <p>{article.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
