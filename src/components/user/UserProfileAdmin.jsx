import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetOneUser, GetPostCountByUser } from "../../managers/UserManager.js";

export const UserProfileAdmin = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      GetOneUser(userId).then(setUser);
      GetPostCountByUser(userId).then((data) => {
        setPostCount(data.count);
      });
    }
  }, [userId]);

  if (!user) return <p>Loading user profile...</p>;

  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
  const createdDate = new Date(user.created_on);
  const formattedDate = `${
    createdDate.getMonth() + 1
  }/${createdDate.getDate()}/${createdDate.getFullYear()}`;
  const avatarUrl = user.profile_image_url || "/default-avatar.png";
  const profileType = user.isAdmin ? "Admin" : "Author";

  return (
    <section className="section" style={{ maxWidth: "700px", margin: "auto" }}>
      <h1 className="title">User Profile</h1>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        {/* Left side: avatar + full name */}
        <div style={{ textAlign: "center", minWidth: "180px" }}>
          <img
            src={avatarUrl}
            alt={`${user.username}'s avatar`}
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1rem",
            }}
          />
          <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            {fullName || "N/A"}
          </p>
        </div>

        {/* Right side: stacked info */}
        <div style={{ flex: 1, fontSize: "1.1rem", lineHeight: "1.6" }}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Creation Date:</strong> {formattedDate}
          </p>
          <p>
            <strong>Profile Type:</strong> {profileType}
          </p>

          {/* ✅ Clickable article count link */}
          {postCount !== null && (
            <p
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
              onClick={() => navigate(`/authorposts/${userId}`)}

            >
              This Author has written {postCount}{" "}
              {postCount === 1 ? "post" : "posts"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
