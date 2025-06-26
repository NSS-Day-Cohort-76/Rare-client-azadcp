import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  GetOneUser,
  GetPostCountByUser,
  checkSubscription,
  createSubscription,
  endSubscription,
  getSubscriberCount, 
} from "../../managers/UserManager.js";

export const UserProfileAdmin = ({ token, currentUserId }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      GetOneUser(userId).then(setUser);
      GetPostCountByUser(userId).then((data) => {
        setPostCount(data.count);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (currentUserId && userId) {

      checkSubscription(currentUserId, userId).then((res) => {

        if (res && res.id) {
          setSubscription(res);
        } else {
          setSubscription(null);
        }
      });
    }
  }, [currentUserId, userId]);

  //  subscriber count if currentUser is viewing their own profile (author)
  useEffect(() => {
    if (parseInt(currentUserId) === parseInt(userId)) {
      getSubscriberCount(userId, token)
        .then((data) => {
          if (data && typeof data.count === "number") {
            setSubscriberCount(data.count);
          } else {
            setSubscriberCount(0);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch subscriber count:", error);
          setSubscriberCount(0);
        });
    }
  }, [currentUserId, userId, token]);

  if (!user) return <p>Loading user profile...</p>;

  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
  const createdDate = new Date(user.created_on);
  const formattedDate = `${
    createdDate.getMonth() + 1
  }/${createdDate.getDate()}/${createdDate.getFullYear()}`;
  const avatarUrl = user.profile_image_url || "/default-avatar.png";
  const profileType = user.isAdmin ? "Admin" : "Author";

  const handleSubscribe = () => {
    console.log("Subscribing follower:", currentUserId, "to author:", userId);
    createSubscription(currentUserId, userId)
      .then((newSub) => {
        if (newSub && newSub.id) {
          setSubscription(newSub);
        } else {
          setSubscription(null);
          console.warn("Failed to subscribe: invalid response", newSub);
        }
      })
      .catch((error) => {
        console.error("Subscription request failed:", error);
      });
  };

  const handleUnsubscribe = () => {
    if (subscription && subscription.id) {
      endSubscription(subscription.id)
        .then(() => {
          console.log("✅ Unsubscribed successfully");
          setSubscription(null); 
        })
        .catch((error) => {
          console.error("❌ Failed to unsubscribe:", error);
        });
    } else {
      console.warn("No subscription to unsubscribe from.");
    }
  };

  return (
    <section className="section" style={{ maxWidth: "700px", margin: "auto" }}>
      <h1 className="title">User Profile</h1>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <div style={{ textAlign: "center", minWidth: "180px" }}>
          <img
            src={avatarUrl}
            alt={`${user.username}'s avatar`}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1rem",
            }}
          />
          <p style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            {fullName || "N/A"}
          </p>
        </div>

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
              This Author has written {postCount} {postCount === 1 ? "post" : "posts"}
            </p>
          )}

          {/* NEW: Show subscriber count only if viewing own profile */}
          {parseInt(currentUserId) === parseInt(userId) && subscriberCount !== null && (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginTop: "0.5rem",
              }}
            >
              You have {subscriberCount} {subscriberCount === 1 ? "subscriber" : "subscribers"}
            </p>
          )}

          {parseInt(currentUserId) !== parseInt(userId) && (
            subscription ? (
              <button className="button is-danger" onClick={handleUnsubscribe}>
                Unsubscribe
              </button>
            ) : (
              <button className="button is-primary" onClick={handleSubscribe}>
                Subscribe
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
};
