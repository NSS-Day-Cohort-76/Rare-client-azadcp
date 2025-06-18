import { useState } from "react"
import { EditDeleteIconButtons } from "./EditDeleteIconButtons"
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"

export const PostDetailsCard = ({ post, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="box p-5">

      {/* Top: Title and Publish Date */}
      <div className="is-flex is-justify-content-space-between mb-4">
        <h1 className="title is-4">{post.title}</h1>
        <p className="has-text-grey">
          Published on: {post.publication_date}
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

      {/* Bottom: Author + Reactions + Actions */}
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <p className="has-text-grey-light">Author: {post.username}</p>

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