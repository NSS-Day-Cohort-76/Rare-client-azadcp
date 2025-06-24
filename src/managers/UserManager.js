export const GetAllUsers = () => {
    return fetch("http://localhost:8000/users")
    .then(res => res.json())
}

export const GetOneUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`)
    .then(res => res.json())
}

export const GetPostCountByUser = async (userId) => {
  const res = await fetch(`http://localhost:8000/posts?userId=${userId}&countOnly=true`);
  return await res.json(); // returns { count: X }
};
