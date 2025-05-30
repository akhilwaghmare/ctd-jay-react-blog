export const getArticles = async () => {
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
  return articleData;
};

// export const getArticleWithId = async (id) => {
//   const res = await fetch(
//     `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
//       import.meta.env.VITE_TABLE_NAME
//     }/${id}`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
//       },
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Error fetching articles");
//   }
//   const data = await res.json();
//   const articleData = data.fields;
//   return articleData;
// };

export const createArticle = async (articleData) => {
  const res = await fetch(
    `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
      import.meta.env.VITE_TABLE_NAME
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: articleData,
          },
        ],
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Error adding new article");
  }
  const data = await res.json();
  return data;
};
