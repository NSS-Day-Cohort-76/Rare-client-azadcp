import { useEffect, useState } from "react";
import { GetAllPosts } from "../../managers/PostManager";
import { PostTable } from "../shared/PostTable.js";

export const AllPostAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    GetAllPosts().then((data) => {
      console.log("Fetched posts:", data);
      setPosts(data);
      setFilteredPosts(data);
    });
  }, []);

  const handleSearch = (text) => {
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredPosts(filtered);
  };

  return (
    <PostTable
      posts={filteredPosts}
      onEdit={(id) => console.log("Edit", id)}
      onDelete={(id) => console.log("Delete", id)}
      onSearch={handleSearch}
    />
  );
};

// <div>
//   <h2>Posts</h2>
//   {posts?.map((post) => (
//     <div key={post.id} className="post-card">
//       <h3>{post.title}</h3>
//       <p></p>
//     </div>
//   ))}
// </div>
