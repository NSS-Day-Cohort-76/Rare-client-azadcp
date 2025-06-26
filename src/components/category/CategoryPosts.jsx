import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getCategoryById, getPostsByCategoryId } from "../../managers/CategoryManager"
import { PostTable } from "../shared/PostTable"

export const CategoryPosts = () => {
  const { categoryId } = useParams()
  const [posts, setPosts] = useState([])
  const [categoryLabel, setCategoryLabel] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    getCategoryById(categoryId)
      .then((category) => setCategoryLabel(category.label))
      .catch((err) => console.error("Failed to load category", err))

    getPostsByCategoryId(categoryId)
      .then(setPosts)
      .catch((err) => console.error("Failed to load posts", err))
  }, [categoryId])

  const handleRowClick = (postId) => {
    navigate(`/posts/${postId}`)
  }

  const handleEdit = (postId) => {
    navigate(`/posts/${postId}/edit`)
  }

  const handleDelete = (postId) => {
    console.log("Delete clicked for post ID:", postId)
    // You can add a modal here like in AllPostAdmin if needed
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-4">Posts in "{categoryLabel}"</h2>
        <PostTable
          rows={posts}
          columns={[
            { key: "title", label: "Title" },
            { key: "author_name", label: "Author" },
            { key: "publication_date", label: "Date" },
            { key: "category", label: "Category" },
            { key: "tags", label: "Tags" },
            { key: "approved", label: "Approved" },
          ]}
          onRowClick={handleRowClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </section>
  )
}

