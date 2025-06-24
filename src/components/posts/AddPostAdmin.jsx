import { SharedInput } from "../shared/SharedInput.jsx";
import { getAllCategories } from "../../managers/CategoryManager.js";
import { useState, useEffect } from "react";

//* Add form for creating a new post
//* DATE/TIME should be saved with new post
//* current USER should be recorded as  (first_name + last_name -> AS AUTHOR_NAME
//* Redirect to the NEW Post details page (must fix MyPostAdmin routing issue)

// const localUser = localStorage.getItem("auth_token");
// const userObj = JSON.parse(localUser);

// const newPost = {
//   userId: userObj.id,
//   category: category_id,
//   title: "",
//   publication_date: new Date().toISOString(),
//   image_url: "",
//   content: "",
//   approved: true,
// };

export const AddPostAdmin = () => {

const [categories, setCategories] = useState([]);
const [selectedCategoryId, setSelectedCategoryId] = useState("");
const [title, setTitle] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [content, setContent] = useState("");

useEffect(() => {
  getAllCategories().then(setCategories);
}, []);

const handleSubmit = (e) => {
  e.preventDefault();
  const newPost = {
    userId: 1, // Replace with actual user ID from auth context or state
    categoryId: selectedCategoryId,
    title: title,
    publication_date: new Date().toISOString(),
    imageUrl: imageUrl,
    content: content,
    approved: true,
  };

  createPost(newPost)
    .then(() => {
      // Redirect to the new post details page
      // navigate(`/posts/${newPost.id}`);
      console.log("Post created successfully:", newPost);
    })
    .catch((error) => {
      console.error("Error creating post:", error);
    });
};
  console.log("New Post Data:", newPost);



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
            <SharedInput className="input is-normal mb-4 is-b" type="text" placeholder="Title" value="{title}" />
            <SharedInput className="input is-normal" type={""} placeholder={"image URL"} />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control column is-two-thirds">
          <textarea className="textarea is-medium" placeholder="Article Content"></textarea>
        </div>
      </div>
      <div className="field column is-half">
        <div className="control">
          <div className="select is-normal mb-4">
            <select>
              <option>Category Select</option>
              {categories?.map((category) => (
                <option options={categories} selectedValue={selectedCategoryId} onChange={(e) => setSelectedParkId(e.target.value)} key={category.id} value={category.id}></option>
                >
              ))}
              </select>
          </div>
        </div>
      </div>
      <div className="field column is three-quarters is-flex is-justify-content-space-between">
        <div className="control">
          <label class="checkbox">
            <input type="checkbox" />
          </label>

          <label class="checkbox">
            <input type="checkbox" />
          </label>

          <label class="checkbox">
            <input type="checkbox" />
          </label>
        </div>
      </div>
      {/* </div> */}
      </form>
    </section>
  );
};

/* h1 New Post
  input component w/ Text Prop (Title Placeholder) */

// {options?.map((option) => (
//       <option key={option[valueKey]} value={option[valueKey]}>
//         {option[labelKey]}
