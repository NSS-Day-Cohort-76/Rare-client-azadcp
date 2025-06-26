import { useEffect, useState } from "react"
import { GetAllComments, DeleteComment, AddComment, UpdateComment } from "../../managers/CommentManager"
import { useParams } from "react-router-dom"
import { getSinglePost } from "../../managers/PostManager"
import { EditDeleteIconButtons } from "../shared/EditDeleteIconButtons"
import { GetAllUsers } from "../../managers/UserManager"

export const CommentViewAdmin = ({token}) => {
    const { postId } = useParams()
    const [comments, setComments] = useState([])
    const [postTitle, setPostTitle] = useState("")
    const [newComment, setNewComment] = useState("")
    const [editCommentId, setEditCommentId] = useState(null)
    const [editValue, setEditValue] = useState("")
    const [users, setUsers] = useState([])
    const [ showDeleteModal, setShowDeleteModal] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null)
    const currentUserId = Number(token)

    useEffect(() => {
        GetAllUsers().then(setUsers)
    }, [])

    useEffect(() => {
        getSinglePost(postId).then(post => setPostTitle(post.title))
        GetAllComments().then(data => setComments(data.filter(c => c.post_id === Number(postId))))
    }, [])

    const getAuthorName = (author_id) => {
        const user = users.find(u => u.id === author_id)
        return user ? user.username : "Unknown Author"
    }

    const handleCreate = () => {
    if (!newComment.trim()) return;
    AddComment({
        post_id: Number(postId),
        author_id: currentUserId,
        content: newComment }).then(() => {
      GetAllComments().then(data => setComments(data.filter(c => c.post_id === Number(postId))));
      setNewComment("");
    });
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditValue(comment.content);
  };

  const handleEditSave = () => {
    if (!editValue.trim()) return;
    UpdateComment({ id: editCommentId, content: editValue }).then(() => {
      GetAllComments().then(data => setComments(data.filter(c => c.post_id === Number(postId))));
      setEditCommentId(null);
      setEditValue("")
    })
}

 const handleConfirmDelete = () => {
  DeleteComment(commentToDelete).then(() => {
    GetAllComments().then(data => setComments(data.filter(c => c.post_id === Number(postId))));
    setShowDeleteModal(false);
    setCommentToDelete(null);
  });
};

const handleCancelDelete = () => {
  setShowDeleteModal(false);
  setCommentToDelete(null);
};

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2 className="title is-4">{postTitle}</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          className="input"
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button className="button is-primary mt-2" onClick={handleCreate}>Post Comment</button>
      </div>
      <div>
  {comments.map(comment => (
    <div
      key={comment.id}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "#fafbfc",
        boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 500 }}>
          {getAuthorName(comment.author_id) || "Unknown Author"}
        </span>
        {comment.author_id === currentUserId && (
          <span>
            <EditDeleteIconButtons
              iconSrc="/images/edit-icon.svg"
              altText="Edit"
              tooltipContent="Edit"
              onClick={() => handleEdit(comment)}
            />
            <EditDeleteIconButtons
              iconSrc="/images/delete-icon.svg"
              altText="Delete"
              tooltipContent="Delete"
              onClick={() => {setShowDeleteModal(true)
                              setCommentToDelete(comment.id) }} 
              
            />
          </span>
        )}
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        {editCommentId === comment.id ? (
          <>
            <input
              className="input"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
            />
            <button className="button is-small is-primary" onClick={handleEditSave}>Save</button>
            <button className="button is-small" onClick={() => setEditCommentId(null)}>Cancel</button>
          </>
        ) : (
          <span>{comment.content}</span>
        )}
      </div>
    </div>
  ))}
  {showDeleteModal && (
  <div style={{
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.3)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 1000
  }}>
    <div style={{
      background: "#fff", padding: "2rem", borderRadius: "8px",
      minWidth: "300px", boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
      display: "flex", flexDirection: "column", gap: "1rem"
    }}>
      <h3 className="title is-5">Delete Comment?</h3>
      <p>Are you sure you want to delete this comment?</p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        <button className="button" onClick={handleCancelDelete}>Cancel</button>
        <button className="button is-danger" onClick={handleConfirmDelete}>Delete</button>
      </div>
    </div>
  </div>
)}
</div>
</div>)}
