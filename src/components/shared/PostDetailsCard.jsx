import { useState, useEffect } from "react";
import { EditDeleteIconButtons } from "./EditDeleteIconButtons.jsx";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal.jsx";
import { GetAllPosts } from "../../managers/PostManager.js";

export const PostDetailsCard = ({ post, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    GetAllPosts(posts).then((data) => {
      setPosts(data);
    });
  }, []);

  if (!post?.id) return <p>Loading...</p>;

  return (
    <div className="box p-5">
      <div className="is-flex is-justify-content-space-between mb-4">
        <h1 className="title is-4">{post.title}</h1>
        <p className="has-text-grey">Publication Date: {post.publication_date}</p>
      </div>

      {/* Image */}
      <div className="mb-4 has-text-centered">
        <img
          src={post.image_url}
          alt={post.title}
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      </div>
      <div className="content mb-5">
        <p>{post.content}</p>
      </div>
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <p className="has-text-grey-light">Author: {post.author_name}</p>

        <div className="is-flex is-align-items-center">
          <span className="tag is-light mr-3">{post.reaction_count || 0} reactions</span>

          <EditDeleteIconButtons
            iconSrc="/images/edit-icon.svg"
            altText="Edit"
            tooltipContent="Edit this post"
            onClick={() => onEdit(post.id)}
          />
          <EditDeleteIconButtons
            iconSrc="/images/delete-icon.svg"
            altText="Delete"
            tooltipContent="Delete this post"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>

      <ConfirmDeleteModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          onDelete(post.id);
        }}
      />
    </div>
  );
};
