import { useEffect, useState } from "react";
import { GetAllTags, addTag, UpdateTag, DeleteThisTag } from "../../managers/TagManager.js";
import { TagTable } from "../shared/TagTable.jsx";

export const TagManagerAdmin = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [editTag, setEditTag] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [deleteTag, setDeleteTag] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    GetAllTags().then((data) => {
      setTags(data);
    });
  }, []);

  const handleCreateTag = () => {
    if (newTag.trim() === "") return;
    addTag(newTag).then(() => {
      GetAllTags().then((data) => setTags(data));
      setNewTag("");
    });
  };

const handleEditClick = (id) => {
    const tag = tags.find((t) => t.id === id)
    console.log("Editing tag:", tag)
    setEditTag(tag)
    setEditValue(tag.label)
    setShowModal(true)
}

const handleEditSave = () => {
    if (!editTag || editValue.trim() === "") return
    console.log("Saving tag:", { ...editTag, label: editValue})
    UpdateTag({ ...editTag, label: editValue}).then(() => {
        GetAllTags().then((data) => setTags(data))
        setShowModal(false)
        setEditTag(null)
        setEditValue("")
    })
}

const handleEditCancel = () => {
    setShowModal(false)
    setEditTag(null)
    setEditValue("")
}

const handleDeleteClick = (id) => {
    const tag = tags.find((t) => t.id === id)
    setDeleteTag(tag)
    setShowDeleteModal(true)
}

const handleDeleteConfirm = () => {
    if (!deleteTag) return 
    console.log("Deleting tag:", deleteTag)
    DeleteThisTag(deleteTag.id).then(() => {
        GetAllTags().then((data) => setTags(data))
        setShowDeleteModal(false)
        setDeleteTag(null)
    })
}

const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setDeleteTag(null)
}


  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <TagTable
          tags={tags}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      <div
        style={{
          width: "300px",
          marginLeft: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1.5rem",
          background: "#fafafa",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}>
        <h3 className="title is-5" style={{ marginBottom: "1rem" }}>
          Create Tag
        </h3>
        <input
          className="input"
          type="text"
          placeholder="Tag name"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <button className="button is-primary" onClick={handleCreateTag}>
          Create
        </button>
     </div>
     {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
          >
            <h3 className="title is-5">Edit Tag</h3>
            <input
              className="input"
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button className="button" onClick={handleEditCancel}>Cancel</button>
              <button className="button is-primary" onClick={handleEditSave}>Save</button>
            </div>  
        </div>
    </div>
  )};
    {showDeleteModal && (
  <div
    style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "300px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h3 className="title is-5">Delete Tag</h3>
      <p>Are you sure you want to delete <strong>{deleteTag?.label}</strong>?</p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
        <button className="button" onClick={handleDeleteCancel}>Cancel</button>
        <button className="button is-danger" onClick={handleDeleteConfirm}>Delete</button>
      </div>
    </div>
</div>
    )}
    </div>
  )
}
