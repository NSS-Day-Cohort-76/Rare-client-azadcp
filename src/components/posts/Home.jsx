// src/components/home/HomePage.jsx
import { useEffect, useState } from "react";
import { getSubscribedPosts } from "../../managers/UserManager.js";
import { PostDetailsCard } from "../shared/PostDetailsCard.jsx";

export const Home = ({ currentUserId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUserId) return;
    getSubscribedPosts(currentUserId)
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.error("Failed to load subscribed posts:", err))
      .finally(() => setLoading(false));
  }, [currentUserId]);

  if (loading) return <p>Loading your feed…</p>;
  if (!posts.length) return <p>You’re not subscribed to anyone yet.</p>;

  return (
    <section className="section">
      <h1 className="title">Your Feed</h1>
      {posts.map((post) => (
        <PostDetailsCard
          key={post.id}
          post={post}
          onEdit={(id) => console.log("Edit", id)}
          onDelete={(id) => console.log("Delete", id)}
        />
      ))}
    </section>
  );
};
