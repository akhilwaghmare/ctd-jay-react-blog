import { useState } from "react";

const ArticleList = ({ articles }) => {
  // APPROACH #1: Track the count directly
  // const [numArticlesOpened, setNumArticlesOpened] = useState(0);

  // APPROACH #2: Track the list of articles opened, making sure we don't double count
  const [articlesOpened, setArticlesOpened] = useState([]);

  const addArticleToList = (article) => {
    if (articlesOpened.filter((v) => v.id === article.id).length === 0) {
      setArticlesOpened([...articlesOpened, article]);
    }
  };

  return (
    <div className="articleList">
      <span># of articles opened: {articlesOpened.length}</span>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          // setNumArticlesOpened={setNumArticlesOpened}
          addArticleToList={addArticleToList}
        />
      ))}
    </div>
  );
};

const ArticleCard = ({ article, setArticlesOpened, addArticleToList }) => {
  const [isBodyHidden, setIsBodyHidden] = useState(true);

  // Used with Approach #1 - locally track whether this card's article has been opened already
  // const [hasBeenOpened, setHasBeenOpened] = useState(false);

  const handleClick = () => {
    // Used with Approach #1 - making sure we don't double count this article
    // if (isBodyHidden && !hasBeenOpened) {
    //   setArticlesOpened((prev) => prev + 1);
    //   setHasBeenOpened(true);
    // }

    // Used with Approach #2
    if (isBodyHidden) {
      addArticleToList(article);
    }

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
