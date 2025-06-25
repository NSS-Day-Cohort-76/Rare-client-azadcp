export const GetAllPosts = () => {
    return fetch("http://localhost:8000/posts")
    .then(res => res.json())
}


export const getSinglePost = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`)
    .then(response => response.json())
    .then(post => {
          // console.log(post.author_name);
          return post;
        });
    };

export const GetPostsByUser = (userId) => {
  return fetch(`http://localhost:8000/posts?userId=${userId}`)
    .then((res) => res.json());
};

export const PostTag = () => {
  return fetch("http://localhost:8000/postTags?_expand=post&_expand=tag").then(res => res.json());
};

