import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../db/query";
import { useArticleData } from "../providers/article-data";

const CreatePostPage = () => {
  const router = useNavigate();
  const { refreshArticleData } = useArticleData();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addArticle = async () => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const todaysDate = formatter.format(new Date());

    try {
      const newArticle = await createArticle({
        title: title,
        publicationDate: todaysDate,
        body: body,
        imageUrl: null,
        author: "New User",
      });
      console.log("New post:", newArticle);

      refreshArticleData();
      router("/");
    } catch (error) {
      console.log("Error occured: ", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addArticle();
    setTitle("");
    setBody("");
  };

  return (
    <div>
      <h1>Create new post</h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "8px",
          }}
        >
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "8px",
          }}
        >
          <label htmlFor="bodyInput">Body: </label>
          <textarea
            id="bodyInput"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
