export const GetAllComments = () => {
    return fetch("http://localhost:8000/comments").then(res => res.json())
}

export const AddComment = (newComment) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newComment)
    })
}

export const UpdateComment = (comment) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment)
    })
}

export const DeleteComment = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, { method: "DELETE" })
}