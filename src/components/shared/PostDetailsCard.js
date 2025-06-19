import { useState, useEffect } from "react"
import { EditDeleteIconButtons } from "./EditDeleteIconButtons"
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"
import { getSinglePost } from "../../managers/PostManager.js"
import { useParams } from "react-router-dom"

export const PostDetailsCard = ({ onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false)
  const [post, setPost] = useState({});
  const { postId } = useParams();


  useEffect(() => {
      getSinglePost(postId).then(setPost);
    }, [postId]);
  
  return (
    <div className="box p-5">

      {/* Top: Title and Publish Date */}
      <div className="is-flex is-justify-content-space-between mb-4">
        <h1 className="title is-4">{post.title}</h1>
        <p className="has-text-grey">
          Publication Date: {post.publication_date}
        </p>
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
      {/* Bottom: Author + Reactions + Actions */}
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

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false)
          onDelete(post.id)
        }}
      />
    </div>
  )
}