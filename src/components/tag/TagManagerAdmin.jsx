import { useEffect, useState } from "react";
import { GetAllTags, addTag } from "../../managers/TagManager.js";
<<<<<<< HEAD
import { TagTable } from "../shared/TagTable.jsx";

export const TagManagerAdmin = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    GetAllTags().then((data) => {
      setTags(data);
=======
import { TagTable } from "../shared/TagTable.js";

export const TagManagerAdmin = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('')


  useEffect(() => {
    GetAllTags().then((data) => {
     
      setTags(data);
      
>>>>>>> develop
    });
  }, []);

  const handleCreateTag = () => {
<<<<<<< HEAD
    if (newTag.trim() === "") return;
    addTag(newTag).then(() => {
      GetAllTags().then((data) => setTags(data));
      setNewTag("");
    });
  };
  return (
=======
    if (newTag.trim() === "") return
    addTag(newTag).then(() => {
        GetAllTags().then((data) => setTags(data))
        setNewTag("")
    })
  }
     return (
>>>>>>> develop
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ flex: 1 }}>
        <TagTable
          tags={tags}
          onEdit={(id) => console.log("Edit", id)}
          onDelete={(id) => console.log("Delete", id)}
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
<<<<<<< HEAD
          alignItems: "stretch",
        }}>
        <h3 className="title is-5" style={{ marginBottom: "1rem" }}>
          Create Tag
        </h3>
=======
          alignItems: "stretch"
        }}
      >
        <h3 className="title is-5" style={{ marginBottom: "1rem" }}>Create Tag</h3>
>>>>>>> develop
        <input
          className="input"
          type="text"
          placeholder="Tag name"
          value={newTag}
<<<<<<< HEAD
          onChange={(e) => setNewTag(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <button className="button is-primary" onClick={handleCreateTag}>
=======
          onChange={e => setNewTag(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <button
          className="button is-primary"
          onClick={handleCreateTag}
        >
>>>>>>> develop
          Create
        </button>
      </div>
    </div>
  );
};
