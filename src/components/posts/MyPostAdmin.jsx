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
    <>
      <section className="section">
        <div className="container">
          <div className="column is-10">
            <div className="header-row">
              <h1>Post Title</h1>
            </div>
            <div className="is-flex is-justify-content-space-between mb-3"></div>
          </div>
          <div className="column is-2">
            <h2>Is this thing working?</h2>
          </div>
        </div>
      </section>

      <section className="section">
        <PostDetailsCard
          post={singlePost}
          user={singlePost}
          // token={userId}
          onEdit={(id) => console.log("edit", id)}
          onDelete={(id) => console.log("delete", id)}
        />
      </section>
    </>
  );
};
