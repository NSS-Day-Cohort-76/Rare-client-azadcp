import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../managers/PostManager";
// import { EditDeleteIconButtons } from "../shared/EditDeleteIconButtons";
import { PostDetailsCard } from "../shared/PostDetailsCard";

export const MyPostAdmin = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(postId).then(setPost);
  }, [postId]);

  return (
    <section className="section">
      <PostDetailsCard
        post={post}
        onEdit={(id) => console.log("edit", id)}
        onDelete={(id) => console.log("delete", id)}
      />
    </section>
  );
};
