import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSinglePost, UpdatePost } from "../../managers/PostManager"
import { getAllCategories } from "../../managers/CategoryManager"
import { GetAllTags } from "../../managers/TagManager"

export const EditPostAdmin = () => {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    getSinglePost(postId).then((data) => {
      setPost(data)
      setSelectedTags(data.tags.map((tag) => tag.id))
    })
    getAllCategories().then(setCategories)
    GetAllTags().then(setTags)
  }, [postId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPost({ ...post, [name]: value })
  }

  const handleCheckboxChange = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedPost = { ...post, tags: selectedTags }
    UpdatePost(updatedPost).then(() => navigate("/posts"))
  }

  if (!post) return <p>Loading...</p>

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-4">Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label className="label">Image URL</label>
            <input
              className="input"
              type="text"
              name="image_url"
              value={post.image_url}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Content</label>
            <textarea
              className="textarea"
              name="content"
              value={post.content}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label className="label">Category</label>
            <div className="select is-fullwidth">
              <select
                name="category_id"
                value={post.category_id}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Tags</label>
            <div className="tags">
              {tags.map((tag) => (
                <label key={tag.id} className="checkbox mr-3">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleCheckboxChange(tag.id)}
                  />
                  &nbsp;{tag.label}
                </label>
              ))}
            </div>
          </div>

          <div className="field mt-4">
            <button className="button is-primary" type="submit">
              Save Changes
            </button>
            <button className="button is-light ml-2" type="button" onClick={() => navigate("/posts")}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  )
}