export const GetAllPosts = () => {
    return fetch("http://localhost:8000/posts")
    .then(res => res.json())
}

export const getSinglePost = (postId) => {
  return fetch(`http://localhost:8000/posts/${postId}`)
    .then(res => res.json())
}