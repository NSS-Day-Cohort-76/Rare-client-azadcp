import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePost } from "../../managers/PostManager";
import { deletePost } from "../../managers/PostManager";
import { PostDetailLayout } from "../shared/PostDetailLayout";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";

export const PostDetailAdmin = () => {
  const [post, setPost] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(postId).then(setPost);
  }, [postId]);

  // 🔥 Navigation for edit
  const handleEdit = (id) => {
    navigate(`/posts/${id}/edit`);
  };

  // 🔥 Trigger delete modal
  const handleDelete = () => {
    setShowModal(true);
  };

  // 🔥 Confirm delete action
  const confirmDelete = () => {
    deletePost(post.id).then(() => {
      setShowModal(false);
      navigate("/posts"); // Send user back to posts list
    });
  };

  // 🔥 Cancel delete
  const cancelDelete = () => {
    setShowModal(false);
  };

  // 🔥 Navigate to author page
  const handleAuthorClick = () => {
    navigate(`/users/${post.user_id}`);
  };

  return (
    <section className="section pt-0 mt-0">
      {post.id ? (
        <>
          <PostDetailLayout
            post={post}
            tags={post.tags || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAuthorClick={handleAuthorClick}
          />

          <ConfirmDeleteModal show={showModal} onCancel={cancelDelete} onConfirm={confirmDelete} />
        </>
      ) : (
        <p>Loading post...</p>
      )}
    </section>
  );
};
