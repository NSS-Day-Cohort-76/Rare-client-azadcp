import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateCategory = ({ onSave }) => {
  const [category, setCategory] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newCategory = {
      label: category.trim()
    }

    onSave(newCategory)
    navigate("/categories")
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "500px" }}>
        <h2 className="title is-4">Create New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Category Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <button type="submit" className="button is-primary">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
