import { SharedInput } from "../shared/SharedInput.jsx";
import { getAllCategories } from "../../managers/CategoryManager.js";
import { useState, useEffect } from "react";
import { CreateNewPost } from "../../managers/PostManager.js";
import { useNavigate } from "react-router-dom";

const localUser = localStorage.getItem("auth_token");
const userObj = JSON.parse(localUser);

export const AddPostAdmin = ({ postId, onSuccess }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      getAllCategories().then(setCategories);
    }
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      user_id: userObj.id,
      category_id: selectedCategoryId,
      title: title,
      publication_date: new Date().toISOString(),
      imageUrl: imageUrl,
      content: content,
      approved: true,
    };

    CreateNewPost(newPost)
      .then(() => {
        setTitle("");
        setImageUrl("");
        setSelectedCategoryId("");
        setContent("");
        if (onSuccess) {
          onSuccess();
        }
        // Optionally, you can redirect to the new post's detail page after creation

        navigate(`/posts/${newPost.id}`);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Handle error (e.g., show a notification)
      });
  };

  return (
    <section className="section">
      <form onSubmit={handleSubmit}>
        <div className="container is-flex-direction-column is-justify-content-left">
          <div className="column is-half">
            <span>
              <h1 className="title is-4 mb-4">New Post</h1>
            </span>
          </div>
          <div className="field column is-half">
            <div className="control">
              <SharedInput
                className="input is-normal mb-4 is-b"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <SharedInput
                className="input is-normal"
                type="text"
                placeholder="image URL"
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl}
              />
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control column is-two-thirds">
            <textarea
              className="textarea is-medium"
              placeholder="Article Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
        </div>
        <div className="field column is-half">
          <div className="control">
            <div className="select is-normal mb-4">
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}>
                <option value="">Category Select</option> {/* Placeholder */}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field column is three-quarters is-flex is-justify-content-space-between">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" />
            </label>

            <label className="checkbox">
              <input type="checkbox" />
            </label>

            <label className="checkbox">
              <input type="checkbox" />
            </label>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">
              Publish
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

/* h1 New Post
  input component w/ Text Prop (Title Placeholder) */

// {options?.map((option) => (
//       <option key={option[valueKey]} value={option[valueKey]}>
//         {option[labelKey]}
