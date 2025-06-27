import { useNavigate } from "react-router-dom";
import { EditDeleteIconButtons } from "./EditDeleteIconButtons";
// import { ReactionBar } from "./ReactionBar"; // 🔥 Ready for future use

export const PostDetailLayout = ({ post, onEdit, onDelete, tags, onAuthorClick }) => {
  const navigate = useNavigate();
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          {/* Main Content */}
          <div className="column is-three-quarters">
            <h1 className="title is-3 pb-4">{post.title}</h1>
            <div className="is-flex is-justify-content-space-between mb-4">
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
              <div>
                <p className="is-size-6">
                  <span>{post.category}</span>{" "}
                </p>
              </div>
              <p className="has-text-success">{post.approved ? "Approved" : ""}</p>
            </div>

            {/* {post.image_url && ( */}
            <figure className="image mb-5" style={{ maxWidth: "800px", margin: "0 auto" }}>
              <img src="/images/image-sub.svg" alt="Post Placeholder" className="is-fullwidth" />
            </figure>
            {/* <img src={post.image_url} alt={post.title} /> */}
            {/* )} */}

            {/* 🔥 Placeholder for future reactions */}
            {/* <ReactionBar postId={post.id} /> */}
            <div className="mb-4 is-flex is-align-items-center is-justify-content-space-between">
              <div>
                <p className="is-size-6">
                  By{" "}
                  <span
                    className="has-text-link"
                    style={{ cursor: "pointer" }}
                    onClick={onAuthorClick}>
                    {post.author_name}
                  </span>{" "}
                </p>
              </div>
              <div>
                <button
                  className="button is-light is-small"
                  onClick={() => navigate(`/comments/${post.id}`)}>
                  View Comments
                </button>
              </div>
              <div className="box has-background-light pt-2 pb-2">
                <p className="is-size-7 has-text-grey">Reactions coming soon...</p>
              </div>
            </div>

            <div className="content">
              <p>{post.content}</p>
            </div>
          </div>

          {/* Tags Sidebar */}
          <div className="column is-one-quarter">
            <h2 className="title is-6">Tags</h2>
            <div className="buttons is-flex is-flex-direction-column">
              {tags?.map((tag) => (
                <button key={tag.id} className="button is-light is-rounded mb-2">
                  {post.tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
