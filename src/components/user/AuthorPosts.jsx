import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetAllPosts } from "../../managers/PostManager.js";
import { GetOneUser } from "../../managers/UserManager.js";
import { PostDetailsCard } from "../shared/PostDetailsCard.jsx";

export const AuthorPosts = () => {
  const { userId } = useParams(); // gets :userId from the URL
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      GetAllPosts().then((allPosts) => {
        const filtered = allPosts.filter((post) => post.user_id === parseInt(userId));
        setUserPosts(filtered);
      });

      GetOneUser(userId).then(setUser);
    }
  }, [userId]);

  if (!user) return <p>Loading author info...</p>;
  if (!userPosts.length) return <p>{user.first_name} has not written any posts yet.</p>;

  return (
    <section className="section">
      <h1 className="title">Articles by {user.first_name} {user.last_name}</h1>

      {userPosts.map((post) => (
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
