import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../managers/PostManager";
import { PostDetailsCard } from "../shared/PostDetailsCard";
// import { GetAllPosts } from "../../managers/PostManager.js";

export const MyPostAdmin = () => {
  const [singlePost, setSinglePost] = useState({});
  const { postId } = useParams();

  useEffect(() => {
    getSinglePost(postId).then(setSinglePost);
  }, [postId]);

  return (
    <section className="section">
      <PostDetailsCard
        post={singlePost}
        user={singlePost}
        // token={userId}
        onEdit={(id) => console.log("edit", id)}
        onDelete={(id) => console.log("delete", id)}
      />
    </section>
  );
};
