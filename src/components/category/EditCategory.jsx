import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategoryById, updateCategory } from "../../managers/CategoryManager"

export const EditCategoryForm = () => {
  const [label, setLabel] = useState("")
  const { categoryId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getCategoryById(categoryId).then((data) => setLabel(data.label))
  }, [categoryId])

  const handleSubmit = (e) => {
    e.preventDefault()

    updateCategory(categoryId, { label }).then(() => {
      navigate("/categories")
    })
  }

  return (
    <section className="section">
      <div className="container">
        <h2 className="title is-4">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Category Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="button is-primary" type="submit">
            Update Category
          </button>
        </form>
      </div>
    </section>
  )
}
