import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSinglePost } from "../../managers/PostManager";
import { EditDeleteIconButtons } from "../shared/EditDeleteIconButtons";

export const MyPostAdmin = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(postId).then(setPost);
  }, [postId]);

  return (
    <section className="section">
      <div className="container box">
        <div className="level">
          <h1 className="title level-left">{post.title}</h1>
          <p className="is-size-7 level-right">
            {new Date(post.publication_date).toLocaleDateString()}
          </p>
        </div>

        {post.image_url && (
          <div className="mb-4">
            <img src={post.image_url} alt={post.title} />
          </div>
        )}

        <div className="content mb-5">
          <p>{post.content}</p>
        </div>

        <div className="level is-mobile">
          <div className="level-left">
            <p className="is-size-7 has-text-grey">Author: {post.author_name}</p>
          </div>

          <div className="level-right">
            <span className="mr-2">Reactions: TBD</span>
            <EditDeleteIconButtons
              iconSrc="/images/edit-icon.svg"
              altText="Edit Post"
              tooltipContent="Edit"
              onClick={() => navigate(`/posts/${post.id}/edit`)}
            />
            <EditDeleteIconButtons
              iconSrc="/images/delete-icon.svg"
              altText="Delete Post"
              tooltipContent="Delete"
              onClick={() => console.log("Open confirmation modal")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
