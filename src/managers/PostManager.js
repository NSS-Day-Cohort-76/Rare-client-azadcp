export const GetAllPosts = () => {
    return fetch("http://localhost:8000/posts")
    .then(res => res.json())
}

export const getSinglePost = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`)
    .then(response => response.json())
    .then(post => {
      console.log("Fetched single post:", post);
      return post;
    });
};