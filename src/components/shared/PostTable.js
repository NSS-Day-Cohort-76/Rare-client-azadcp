import { EditDeleteIconButtons } from "./EditDeleteIconButtons"

export const PostTable = ({ posts, onEdit, onDelete, onSearch }) => {
  return (
    <section className="section">
      <div className="container">

        {/* Top Row: Search + Add Post */}
        <div className="is-flex is-justify-content-space-between mb-3">
          <input
            className="input is-small"
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
          <button className="button is-small is-primary">
            <span className="icon"><i className="fas fa-plus"></i></span>
            <span>Add Post</span>
          </button>
        </div>

        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th></th> {/* Icon column */}
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(posts) && posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <div className="is-flex">
                    <EditDeleteIconButtons
                      iconSrc="/images/edit-icon.svg"
                      altText="Edit"
                      tooltipContent="Edit Post"
                      onClick={() => onEdit(post.id)}
                    />
                    <EditDeleteIconButtons
                      iconSrc="/images/delete-icon.svg"
                      altText="Delete"
                      tooltipContent="Delete Post"
                      onClick={() => onDelete(post.id)}
                    />
                  </div>
                </td>
                <td>{post.title}</td>
                <td>{post.author_name}</td>
                <td>{post.publication_date}</td>
                <td>{post.category}</td>
                <td>{post.tags?.join(", ")}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={post.approved === 1}
                    disabled
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </section>
  )
}