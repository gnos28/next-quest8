import axios from "axios";

export async function getArticles(offset, limit) {
  return axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${limit}`
    )
    .then((res) => res.data);
}

export async function getSingleArticle(id) {
  const article = await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((res) => res.data);

  return {
    ...article,
    pictureUrl: `https://picsum.photos/seed/${id}/600/400`
  };
}
