import { useNavigate } from "react-router-dom"
import { EditDeleteIconButtons } from "./EditDeleteIconButtons"

export const CategoryTable = ({ categories, onEdit, onDelete, onSearch, onAdd }) => {
  // Sort categories alphabetically by name
  const sortedCategories = [...categories].sort((a, b) =>
    a.label.localeCompare(b.label)
  )
  const navigate = useNavigate()

  return (
    <section className="section">
      <div className="container">

        {/* Top Row: Search + Add Category */}
        <div className="is-flex is-justify-content-space-between mb-3">
          <input
            className="input is-small"
            type="text"
            placeholder="Search Categories"
            onChange={(e) => onSearch?.(e.target.value)}
            style={{ maxWidth: "300px" }}
          />
          <button
            className="button is-small is-primary"
            // onClick={navigate(`/categories/add`)}
          >
            <span className="icon"><i className="fas fa-plus"></i></span>
            <span>Add Category</span>
          </button>
        </div>

        {/* Table */}
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th></th> {/* Icon column */}
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category) => (
              <tr key={category.id}>
                <td>
                  <div className="is-flex">
                    <EditDeleteIconButtons
                      iconSrc="/images/edit-icon.svg"
                      altText="Edit"
                      tooltipContent="Edit Category"
                      onClick={() => onEdit(category.id)}
                    />
                    <EditDeleteIconButtons
                      iconSrc="/images/delete-icon.svg"
                      altText="Delete"
                      tooltipContent="Delete Category"
                      onClick={() => onDelete(category.id)}
                    />
                  </div>
                </td>
                <td>{category.label}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </section>
  )
}
