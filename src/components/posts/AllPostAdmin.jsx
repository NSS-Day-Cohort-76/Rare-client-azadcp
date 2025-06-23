import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllPosts } from "../../managers/PostManager";
import { PostTable } from "../shared/PostTable.jsx";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import { SharedInput } from "../shared/SharedInput.jsx";
import { SharedPostButton } from "../shared/SharedPostButton.jsx";

export const AllPostAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null); //
  const [showModal, setShowModal] = useState(false); //

  const navigate = useNavigate();

  useEffect(() => {
    GetAllPosts().then((data) => {
      setPosts(data);
      setFilteredPosts(data);
    });
  }, []);

  const handleRowClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleEdit = (postId) => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDelete = (postId) => {
    setSelectedPostId(postId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    console.log("🧨 Delete confirmed for post:", selectedPostId);
    setShowModal(false);
    // TODO: Add fetch DELETE logic here if needed
  };

  const cancelDelete = () => {
    setSelectedPostId(null);
    setShowModal(false);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredPosts(filtered);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="is-flex is-justify-content-space-between mb-3">
          <SharedInput
            className="input is-small"
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            style={{ maxWidth: "300px" }}
          />
          <SharedPostButton className="button is-small is-primary">
            Add Post &nbsp;✚
          </SharedPostButton>{" "}
        </div>

        <PostTable
          rows={filteredPosts} // ✅
          columns={[
            { key: "title", label: "Title" },
            { key: "author_name", label: "Author" },
            { key: "publication_date", label: "Date" },
            { key: "category", label: "Category" },
            { key: "tags", label: "Tags" },
            { key: "approved", label: "Approved" },
          ]}
          onSearch={handleSearch}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isPostTable={true}
        />
        <ConfirmDeleteModal show={showModal} onCancel={cancelDelete} onConfirm={confirmDelete} />
      </div>
    </section>
  );
};
