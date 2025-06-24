export const GetAllPosts = () => {
  return fetch("http://localhost:8000/posts").then((res) => res.json());
};

export const getSinglePost = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`)
    .then((response) => response.json())
    .then((post) => {
      // console.log(post.author_name);
      return post;
    });
};

export const GetPostsByUser = (userId) => {
  return fetch(`http://localhost:8000/posts?userId=${userId}`).then((res) => res.json());
};

export const CreateNewPost = (postData) => {
  return fetch("http://localhost:8000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to create post");
    }
    return res.json();
  });
};

export const UpdatePost = (post) => {
  return fetch(`http://localhost:8000/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};
