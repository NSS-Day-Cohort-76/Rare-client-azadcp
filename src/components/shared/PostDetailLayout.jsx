import { EditDeleteIconButtons } from "./EditDeleteIconButtons";
// import { ReactionBar } from "./ReactionBar"; // 🔥 Ready for future use

export const PostDetailLayout = ({ post, onEdit, onDelete, tags, onAuthorClick }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          {/* Main Content */}
          <div className="column is-three-quarters">
            <div className="is-flex is-justify-content-space-between mb-2">
              <div className="is-flex">
                <EditDeleteIconButtons
                  iconSrc="/images/delete-icon.svg"
                  altText="Delete"
                  tooltipContent="Delete"
                  onClick={() => onDelete(post.id)}
                />
                <EditDeleteIconButtons
                  iconSrc="/images/edit-icon.svg"
                  altText="Edit"
                  tooltipContent="Edit"
                  onClick={() => onEdit(post.id)}
                />
              </div>
              <p className="has-text-success">{post.approved ? "Approved" : ""}</p>
            </div>

            <h1 className="title is-3">{post.title}</h1>
            <p className="is-size-6">
              By{" "}
              <span className="has-text-link" style={{ cursor: "pointer" }} onClick={onAuthorClick}>
                {post.author_name}
              </span>{" "}
              | {post.category}
            </p>

            {post.image_url && (
              <figure className="image is-4by3 mb-4">
                <img src="/images/delete-icon.svg" alt="4x3 Placeholder"></img>
                {/* <img src={post.image_url} alt={post.title} /> */}
              </figure>
            )}

            <button className="button is-light is-small mb-4">View Comments</button>

            {/* 🔥 Placeholder for future reactions */}
            {/* <ReactionBar postId={post.id} /> */}
            <div className="box has-background-light mb-4">
              <p className="is-size-7 has-text-grey">Reactions feature coming soon...</p>
            </div>

            <div className="content">
              <p>{post.content}</p>
            </div>
          </div>

          {/* Tags Sidebar */}
          <div className="column is-one-quarter">
            <h2 className="title is-5">Tags</h2>
            <div className="buttons is-flex is-flex-direction-column">
              {tags?.map((tag) => (
                <button key={tag.id} className="button is-light is-rounded mb-2">
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
