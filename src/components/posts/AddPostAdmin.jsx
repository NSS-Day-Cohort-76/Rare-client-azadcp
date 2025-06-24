import { SharedInput } from "../shared/SharedInput.jsx";

//* Add form for creating a new post
//* DATE/TIME should be saved with new post
//* current USER should be recorded as  (first_name + last_name -> AS AUTHOR_NAME
//* Redirect to the NEW Post details page (must fix MyPostAdmin routing issue)

const newPost = {
  userId: user_id,
  category: category_id,
  title: "",
  publication_date: new Date().toISOString(),
  image_url: "",
  content: "",
  approved: true,

  // : tripName,
  // userId: userObj.id,
  // createdAt: new Date().toISOString(),
  // parkId: parkId ? parseInt(parkId) : parseInt(selectedParkId),
};

export const AddPostAdmin = () => {
  return (
    <section className="section">
      <div className="container is-flex-direction-column is-justify-content-left">
        <div className="column is-half">
          <span>
            <h1 className="title is-4 mb-4">New Post</h1>
          </span>
        </div>
        <div className="field column is-half">
          <div className="control">
            <SharedInput className="input is-normal mb-4 is-b" type={""} placeholder={"Title"} />
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
              <option>With options</option>
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
    </section>
  );
};

/* h1 New Post
  input component w/ Text Prop (Title Placeholder) */
