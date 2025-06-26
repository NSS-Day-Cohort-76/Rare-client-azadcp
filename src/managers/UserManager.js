export const GetAllUsers = () => {
    return fetch("http://localhost:8000/users")
    .then(res => res.json())
}

export const GetOneUser = (userId) => {
    return fetch(`http://localhost:8000/users/${userId}`)
    .then(res => res.json())
}

export const GetPostCountByUser = async (userId) => {
  const res = await fetch(`http://localhost:8000/posts?userId=${userId}&countOnly=true`);
  return await res.json(); // returns { count: X }
};

// Check if follower is subscribed to author
export const checkSubscription = (followerId, authorId) => {
  return fetch(`http://localhost:8000/subscriptions?followerId=${followerId}&authorId=${authorId}`)
    .then(res => res.json())
}

export const createSubscription = async (followerId, authorId) => {
  const res = await fetch("http://localhost:8000/subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      follower_id: followerId,
      author_id: authorId
    })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Failed to subscribe: ${error.message}`);
  }

  return await res.json();
};


export const endSubscription = (subscriptionId) => {
  return fetch(`http://localhost:8000/subscriptions/${subscriptionId}/end`, {
    method: "PUT",
  }).then(res => {
    if (!res.ok) {
      throw new Error('Failed to unsubscribe');
    }
  
    return;
  });
}
export const getSubscriberCount = async (authorId) => {
  try {
    const response = await fetch(`http://localhost:8000/subscriptions?authorId=${authorId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch subscriber count: ${response.statusText}`);
    }

    const data = await response.json();



    return { count: typeof data.subscriber_count === "number" ? data.subscriber_count : 0 };
  } catch (error) {
    console.error("Error in getSubscriberCount:", error);
    return { count: 0 };
  }
};
