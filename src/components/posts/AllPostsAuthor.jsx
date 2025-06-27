import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllPosts, PostTag } from "../../managers/PostManager";
import { PostTable } from "../shared/PostTable.jsx";
import { ConfirmDeleteModal } from "../shared/ConfirmDeleteModal";
import { SharedInput } from "../shared/SharedInput.jsx";
import { SharedPostButton } from "../shared/SharedPostButton.jsx";
import { GetAllTags } from "../../managers/TagManager.js";

export const AllPostsAuthor = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [postTags, setPostTags] = useState([]);
  const navigate = useNavigate();

  // Get the current user's ID from localStorage
  const userId = localStorage.getItem("rare_userId");

  useEffect(() => {
    Promise.all([GetAllPosts(), GetAllTags(), PostTag()]).then(
      ([postsData, tagsData, postTagsData]) => {
        // Attach tags to each post
        const postsWithTags = postsData.map((post) => {
          const tagIds = postTagsData.filter((pt) => pt.post_id === post.id).map((pt) => pt.tag_id);
          const postTagsArr = tagsData.filter((tag) => tagIds.includes(tag.id));
          return { ...post, tags: postTagsArr };
        });

        // Filter posts to only those by the current user
        const authorPosts = postsWithTags.filter((post) => String(post.user_id) === String(userId));

        setPosts(authorPosts);
        setFilteredPosts(authorPosts);
        setTags(tagsData);
        setPostTags(postTagsData);
      }
    );
  }, [userId]);

  const handleAddPostClick = () => {
    navigate(`/posts/newpost`);
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
    setShowModal(false);
    // TODO: Add fetch DELETE logic here if needed
  };

  const cancelDelete = () => {
    setSelectedPostId(null);
    setShowModal(false);
  };

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    const filtered = posts.filter((post) => {
      const inTitle = post.title.toLowerCase().includes(text);
      const inTags = post.tags && post.tags.some((tag) => tag.label.toLowerCase().includes(text));
      return inTitle || inTags;
    });
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
          <SharedPostButton onClick={handleAddPostClick} className="button is-small is-primary">
            Add Post &nbsp;✚
          </SharedPostButton>
        </div>

        <PostTable
          rows={filteredPosts}
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
