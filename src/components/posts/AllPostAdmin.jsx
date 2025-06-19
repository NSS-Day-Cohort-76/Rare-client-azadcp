import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllPosts } from "../../managers/PostManager";
import { PostTable } from "../shared/PostTable";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";

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

  const handleSearch = (text) => {
    const filtered = posts.filter((post) => post.title.toLowerCase().includes(text.toLowerCase()));
    setFilteredPosts(filtered);
  };

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

  return (
    <>
      <PostTable
        rows={filteredPosts} // ✅
        columns={[
          { key: "title", label: "Title" },
          { key: "username", label: "Author" },
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
    </>
  );
};
