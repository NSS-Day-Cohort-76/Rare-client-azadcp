import { SharedInput } from "../shared/SharedInput.jsx";

//* Add form for creating a new post
//* DATE/TIME should be saved with new post
//* current USER should be recorded as  (first_name + last_name -> AS AUTHOR_NAME
//* Redirect to the NEW Post details page (must fix MyPostAdmin routing issue)

export const AddPostAdmin = () => {
  return (
    <section className="section">
      <div className="container">
        <span>
          <h1 className="">New Post</h1>
        </span>
        <SharedInput type={""} placeholder={"Title"} />
      </div>
    </section>
  );
};

/* h1 New Post
  input component w/ Text Prop (Title Placeholder) */
