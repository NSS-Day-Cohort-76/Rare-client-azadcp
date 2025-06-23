import { SharedInput } from "../shared/SharedInput.jsx";

//* Add form for creating a new post
//* DATE/TIME should be saved with new post
//* current USER should be recorded as  (first_name + last_name -> AS AUTHOR_NAME
//* Redirect to the NEW Post details page (must fix MyPostAdmin routing issue)

export const AddPostAdmin = () => {
  return (
    <section className="section">
      <div className="container is-flex-direction-column is-justify-content-left">
        <div className="column is-half">
          <span>
            <h1 className="title is-4 mb-4">New Post</h1>
          </span>
          <SharedInput className="input is-normal mb-4 is-b" type={""} placeholder={"Title"} />
          <SharedInput className="input is-normal" type={""} placeholder={"image URL"} />
        </div>
        <div className="field">
          <div className="control column is-two-thirds">
            <textarea class="textarea is-medium" placeholder="Article Content"></textarea>
          </div>
          <div class="select is-normal">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
          <div class="checkboxes">
            <label class="checkbox">
              <input type="checkbox" />
            </label>

            <label class="checkbox">
              <input type="checkbox" checked />
            </label>

            <label class="checkbox">
              <input type="checkbox" checked />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

/* h1 New Post
  input component w/ Text Prop (Title Placeholder) */
