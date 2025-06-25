import { SharedInput } from "../shared/SharedInput.jsx";
import { getAllCategories } from "../../managers/CategoryManager.js";
import { useState, useEffect } from "react";
import { CreateNewPost } from "../../managers/PostManager.js";
import { useNavigate } from "react-router-dom";

const userId = localStorage.getItem("auth_token");
// let userObj = JSON.parse(localUser);

// if (localUser) {
//   // Check if localUser is not null or empty
//   try {
//     userObj = JSON.parse(localUser);
//   } catch (e) {
//     console.error("Failed to parse localUser JSON:", e);
//     // Handle the error, e.g., clear localStorage or redirect to login
//     localStorage.removeItem("auth_token");
//   }
// } else {
//   // Handle the case where localUser is not found in localStorage
//   console.warn("rare_user not found in localStorage.");
//   // For example, redirect to a login page
// }

// // Now you can safely use userObj if it's not null
// if (userObj) {
//   console.log("Parsed user object:", userObj);
// }

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
      user_id: parseInt(userId, 10),
      category_id: selectedCategoryId,
      title: title,
      publication_date: new Date().toISOString(),
      image_url: imageUrl,
      content: content,
      approved: true,
    };

    CreateNewPost(newPost).then(() => {
      setTitle("");
      setImageUrl("");
      setSelectedCategoryId("");
      setContent("");
      if (onSuccess) {
        onSuccess();
      }

      navigate(`/posts/${postId}`);
    });
    // .catch((error) => {
    //   console.error("Error on the AddPostAdmin module:", error);
    // //   // Handle error (e.g., show a notification)
    // });
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
                onChange={(e) => setSelectedCategoryId(parseInt(e.target.value, 10))}>
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
