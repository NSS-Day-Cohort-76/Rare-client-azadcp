import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCategoryById, getPostsByCategoryId } from "../../managers/CategoryManager"

export const CategoryPosts = () => {
  const { categoryId } = useParams()
  const [posts, setPosts] = useState([])
  const [categoryLabel, setCategoryLabel] = useState("")

  useEffect(() => {
    getCategoryById(categoryId)
      .then((category) => setCategoryLabel(category.label))
      .catch((err) => console.error("Failed to load category", err))

    getPostsByCategoryId(categoryId)
      .then(setPosts)
      .catch((err) => console.error("Failed to load posts", err))
  }, [categoryId])

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-4">Posts in "{categoryLabel}"</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
